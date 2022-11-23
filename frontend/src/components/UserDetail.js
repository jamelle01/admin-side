import { useUsersContext } from "../hooks/useUsersContext";
import {Link} from 'react-router-dom';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const UserDetails = ({ user }) => {
  
  const { dispatch } = useUsersContext();
  const handleClick = async () => {
    const response = await fetch('/api/users/'+ user._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok){
      dispatch({type: 'DELETE_USER',  payload: json});
    }
  }

  return (
    <div className="user-details">
      <h5 className="num"></h5>
      <h4>{user.name}</h4>
      <h4>{user.username}</h4>
      {/* <p><strong>Number of reps: </strong>{user.password}</p> */}
      <p>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-sharp edit"><Link className="ed " to={`/edit/${user._id}`}>edit</Link></span>
      <span className="material-symbols-sharp delete" onClick={handleClick}>delete</span>
    </div>
    
  );
}
  
export default UserDetails;