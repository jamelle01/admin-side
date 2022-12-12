import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Webcam from "react-webcam";

const Edit = () => {
  const { id } = useParams();

  // variables
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = new useNavigate();

  //image
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");
  const [openCamera, setOpenCamera] = useState(false);

  // for loading state
  const [isLoading, setIsLoading] = useState(false);

  const { admin } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      const response = await fetch("/api/users/" + id, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();
      setName(json.name);
      setUsername(json.username);
      setPassword(json.password);
      setImage(json.img.url);
      setIsLoading(false);
    };

    if (admin) {
      fetchWorkouts();
    }
  }, [admin]);

  //camera things
  const capture = useCallback(
    (e) => {
      e.preventDefault();

      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setOpenCamera(false);
    },
    [webcamRef, image]
  );

  const camera = (e) => {
    e.preventDefault();

    setOpenCamera(true);
  };

  const cameraClose = () => {
    setOpenCamera(false);
    const video = document.querySelector("video");

    openCamera(false);
  };

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

  // submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if admin
    if (!admin) {
      setError("You must be logged in");
      return;
    }

    setIsLoading(true);
    const user = { name, username, password, image };

    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
    });
    const json = await response.json();
    console.log("hi");

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); // send json the empty fields
      console.log("not ok");
      setIsLoading(false);
    }
    if (response.ok) {
      setError(null);
      setName("");
      setPassword("");
      setUsername("");
      setEmptyFields([]);
      console.log("workout updated", json);
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <div className='edits'>
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
      <form className='inputform' encType='multipart/form-data'>
        {/* <h1>{id}</h1> */}
        <h3>Edit User</h3>

        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          id='name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
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
        <div className='imgbtns'>
          <input
            type='file'
            name='image'
            id='formupload'
            onChange={handleImage}
            accept='image/jpeg'
            className={emptyFields.includes("image") ? "error" : ""}
          />
          <span>or</span>
          <button onClick={camera}>Open camera</button>
        </div>

        <div>
          {openCamera && (
            <div className='camera'>
              <span
                className='exit material-symbols-outlined'
                onClick={cameraClose}
              >
                close
              </span>
              <Webcam
                className='webcam'
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
              />
              <button className='capture' onClick={capture}>
                <span class='material-symbols-outlined'>photo_camera</span>
              </button>
            </div>
          )}
        </div>
        <div className='imgsection'>
          <img src={image} alt='' />
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
