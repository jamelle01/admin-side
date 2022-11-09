import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {Link} from 'react-router-dom';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    const response = await fetch('/api/workouts/'+ workout._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT',  payload: json});
    }
  }

  const handleEdit = async () => {
    document.getElementById('title').value = "jeif"
    console.log("hi")
  }

  return (
    <div className="workout-details">
    <h4>{workout.title}</h4>
    <p><strong>Load (kg): </strong>{workout.load}</p>
    <p><strong>Number of reps: </strong>{workout.reps}</p>
    <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    <span className="material-symbols-sharp edit"><Link className="ed " to={`/edit/${workout._id}`}>edit</Link></span>
    <span className="material-symbols-sharp delete" onClick={handleClick}>delete</span>
  </div>
    
  );
}
  
export default WorkoutDetails