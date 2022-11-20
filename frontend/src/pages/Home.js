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
               
                <form id="form"> 
                    <input type="search" 
                    id="query" 
                    name="q" 
                    placeholder="Search..."
                    />
                    <button className="searchbutton">
                        <svg viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                    </button>
                </form>
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