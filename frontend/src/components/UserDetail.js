import { useUsersContext } from "../hooks/useUsersContext";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const UserDetails = ({ user }) => {
  // mao ni makita mga users sa home

  const { dispatch } = useUsersContext();

  const handleClick = async () => {
    const result = await confirm("Delete User?");
    if (result) {
      const response = await fetch("/api/users/" + user._id, {
        // fetch sa backend
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_USER", payload: json }); // dispatch gamiton rani para ma update ang sa frontend display
      }
    }
  };

  return (
    <div className='user-details'>
      <h5 className='num'></h5>
      <h4>{user.name}</h4>
      <h4>{user.username}</h4>
      {/* <p><strong>Number of reps: </strong>{user.password}</p> */}
      <p>
        {formatDistanceToNow(new Date(user.updatedAt), {
          addSuffix: true,
        })}
      </p>
      <span className='material-symbols-sharp edit'>
        <Link className='ed ' to={`/edit/${user._id}`}>
          edit
        </Link>
      </span>
      {/*inig click ani proceed sa details sa user*/}
      <span className='material-symbols-sharp delete' onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default UserDetails;
