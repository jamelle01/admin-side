import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';


const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();

    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok){
                dispatch({ type: 'SET_WORKOUTS', payload: json }); // this the action that gonna pyr in the workoutcontext
            }
        }

        fetchWorkouts();
    }, [dispatch]) //usefetch

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm/>
        </div>
    ) // return
}

export default Home;