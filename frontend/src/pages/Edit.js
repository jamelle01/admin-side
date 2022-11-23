import { useParams } from "react-router-dom";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  // const {workouts, dispatch} = useWorkoutsContext();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = new useNavigate();

  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/users/" + id);
      const json = await response.json();

      setName(json.name);
      setUsername(json.username);
      setPassword(json.password);
      setImage(json.img.url);
    };
    fetchWorkouts();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, username, password, image};

    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("hi");

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); // send json the empty fields
      console.log("not ok");
    }
    if (response.ok) {
      setError(null);
      setName("");
      setPassword("");
      setUsername("");
      setEmptyFields([]);
      console.log("workout updated", json);
      // dispatch({type: 'CREATE_WORKOUT', payload: json});
      navigate("/");
    }
  };

  return (
    <div className='edits'>
      <form encType='multipart/form-data'>
        {/* <h1>{id}</h1> */}
        <h3>Edit User</h3>

        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          id='name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""} // if naay name sa emptyfields nga array nga naa sa form e set the classname to error
        />

        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={emptyFields.includes("username") ? "error" : ""}
        />

        <label htmlFor='password'>Password: </label>
        <input
          type='text'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={emptyFields.includes("password") ? "error" : ""}
        />
        <input
          type='file'
          name='image'
          id='formupload'
          onChange={handleImage}
        />
        <div className='imgsection'>
          <img src={image} width='300' alt='' />
        </div>

        <div className='adedbuttons'>
          <button onClick={handleSubmit} className='update'>
            Update
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            className='cancel'
          >
            Cancel
          </button>
        </div>

        {error && <div className='error'>{error}</div>}
      </form>
      <div className='capture'>sd</div>
    </div>
  );
};

export default Edit;
