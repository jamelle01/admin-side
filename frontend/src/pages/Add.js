import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Webcam from "react-webcam";

const Add = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  //image
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");
  const [openCamera, setOpenCamera] = useState(false);

  // for loading state
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
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

    setIsLoading(true);
    const user = { name, username, password, image };
    console.log("clicked");

    const response = await fetch("/api/users/", {
      // fetch sa backend nya post
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("wait");
    const json = await response.json();
    // .then((response) => {

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); // send json the empty fields
      console.log("not ok");
      setIsLoading(false);
    }
    if (response.ok) {
      // reset mga display field
      setError(null);
      setName("");
      setPassword("");
      setUsername("");
      setEmptyFields([]);
      console.log("new user added", json);
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <div className='create'>
      {/*mao input field if mag add user*/}
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
        <h3>Add New</h3>

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
                <span className='material-symbols-outlined'>photo_camera</span>
              </button>
            </div>
          )}
        </div>
        <div className='imgsection'>
          <img className='img-fluid' src={image} alt='' />
        </div>
        <div className='adedbuttons'>
          <button className='addx' onClick={handleSubmit}>
            Add
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
    </div>
  );
};

export default Add;
