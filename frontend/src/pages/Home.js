import { useEffect } from "react";
import { useUsersContext } from "../hooks/useUsersContext";
import {Link} from 'react-router-dom';

// components
import UserDetails from '../components/UserDetail';
// import WorkoutForm from '../components/WorkoutForm';


const Home = () => {
    const {users, dispatch} = useUsersContext();

    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/users');
            const json = await response.json();

            if (response.ok){
                dispatch({ type: 'SET_USERS', payload: json }); // this the action that gonna pyr in the workoutcontext
            }
        }

        fetchWorkouts();
    }, [dispatch]) //usefetch

    return (
        <div className="home">
            <div className="upper">
                <p className="semi-title">LIST OF USERS</p>
                
                <button className="home-button add"> <Link id="link" to="/add">add user </Link></button>
               
                <button className="home-button search">search</button>
            </div>
            
            <div className="users">
                <div className="heading">
                    <p>NAME</p>
                    <p>USERNAME</p>
                </div>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
            {/* <WorkoutForm/> */}
        </div>
    ) // return
}

export default Home;