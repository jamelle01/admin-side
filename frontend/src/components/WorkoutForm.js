import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, reps};

        const response = await fetch('/api/workouts', { 
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json' 
            }

        });
        const json = await response.json();

        if (!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields); // send json the empty fields
        }
        if (response.ok){
            setError(null);
            setTitle('');
            setReps('');
            setLoad('');
            setEmptyFields([]);
            console.log("new workout added", json);
            dispatch({type: 'CREATE_WORKOUT', payload: json});
        }
        
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New</h3>

            <label htmlFor="title">Title: </label>
            <input 
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''} // if naay title sa emptyfields nga array nga naa sa form e set the classname to error
            />
            
            <label htmlFor="load">Load: </label>
            <input 
                type="number"
                id="load"
                onChange={(e) => setLoad(e.target.value)} 
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            
            <label htmlFor="reps">Reps: </label>
            <input 
                type="number"
                id="reps"
                onChange={(e) => setReps(e.target.value)} 
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
      );
}
 
export default WorkoutForm;