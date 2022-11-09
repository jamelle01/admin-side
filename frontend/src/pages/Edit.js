import { useParams } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    // const {workouts, dispatch} = useWorkoutsContext();

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = new useNavigate();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts/'+id);
            const json = await response.json();
            console.log(json);

            setTitle(json.title);
            setLoad(json.load);
            setReps(json.reps);
        }
        fetchWorkouts();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, reps};

        const response = await fetch(`/api/workouts/${id}`, { 
            method: 'PATCH',
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
            console.log("workout updated", json);
            // dispatch({type: 'CREATE_WORKOUT', payload: json});
            navigate("/");
        }
        
    };

    return (  
        <div className="edit">
            <form onSubmit={handleSubmit}>
                <h1>{id}</h1>
                <h3>Edit User</h3>

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
                <div className="adedbuttons">
                    <button className="update">Update</button>
                    <button className="cancel">Cancel</button>
                </div>

                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
 
export default Edit;