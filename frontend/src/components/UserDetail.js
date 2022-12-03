import { useUsersContext } from "../hooks/useUsersContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const UserDetails = ({ user }) => {
  // mao ni makita mga users sa home
  const { dispatch } = useUsersContext();
  const { admin } = useAuthContext();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!admin) {
      return;
    }

    const result = await window.confirm("Delete User?");

    if (result) {
      setIsLoading(true);
      const response = await fetch("/api/users/" + user._id, {
        // fetch sa backend
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_USER", payload: json }); // dispatch gamiton rani para ma update ang sa frontend display
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='user-details'>
      {isLoading && (
        <div className='loading'>
          <div className='loadingio-spinner-pulse-k69qpabx8be'>
            <div className='ldio-cw45abrrsy'>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
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
