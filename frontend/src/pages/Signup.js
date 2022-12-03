import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password);
  };

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>User Name:</label>
      <input
        type='username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading} className='in-btn'>
        Sign up
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Signup;
