import { useEffect, useState } from "react";
import { useUsersContext } from "../hooks/useUsersContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import UserDetails from "../components/UserDetail";
// import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { users, dispatch } = useUsersContext();
  const [query, setQuery] = useState("");

  const { admin } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json }); // this the action that gonna pyr in the workoutcontext
      }
    };

    if (admin) {
      fetchWorkouts();
    }
  }, [dispatch, admin]); //usefetch

  return (
    <div className='home'>
      <div className='upper'>
        <p className='semi-title'>LIST OF USERS</p>
        <Link className='add-button' id='link' to='/add'>
          add user{" "}
        </Link>

        <form id='searchform'>
          <input
            type='search'
            id='query'
            name='q'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
          />
          <button disabled className='searchbutton'>
            <svg viewBox='0 0 1024 1024'>
              <path
                className='path1'
                d='M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z'
              ></path>
            </svg>
          </button>
        </form>
      </div>

      <div className='users'>
        <div className='heading'>
          <p className='hnum'>#</p>
          <p>NAME</p>
          <p>USERNAME</p>
          <p></p>
          <p></p>
          <p></p>
        </div>
        {!users && 
        <div style={
          {
            backgroundColor: "white",
            textAlign: "center",
            padding: "5px"
            
          }
        }>database is empty</div>}
        {users &&
          users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(query) ||
                user.username.toLowerCase().includes(query)
            )
            .map((user) => (
              <UserDetails key={user._id} user={user} /> //
            ))}
      </div>
      {/* <WorkoutForm/> */}
    </div>
  ); // return
};

export default Home;
