import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { admin } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className='container'>
        <Link className="h" to='/'>
          <h1>ADMIN CONTROL</h1>
        </Link>

        <nav>
          {}
          {admin && (
            <div>
              <button className="log" onClick={handleClick}><span class="material-symbols-outlined">
logout
</span> Log out</button>
            </div>
          )}
          {!admin && (
            <div>
              <Link className="log" to='/login'>Login</Link>
              {/* <Link to='/signup'>Signup</Link> */}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
