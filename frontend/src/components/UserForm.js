import { useState } from "react";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
    // const {dispatch} = useWorkoutsContext();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = useNavigate();

    const [image, setImage] = useState('');

    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = {name, username, password, image};
        console.log("clicked");
        
        fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' 
            }

        })
        .then((response) => {
            if (!response.ok){
                setError(json.error);
                setEmptyFields(json.emptyFields); // send json the empty fields
            }
            if (response.ok){
                setError(null);
                setName('');
                setPassword('');
                setUsername('');
                setEmptyFields([]);
                console.log("new user added", json);
                // dispatch({type: 'CREATE_WORKOUT', payload: json});
                
            }
            
            const json = response.json();
        })
        navigate('/');
        console.log('hidsde')
        

        // if (!response.ok){
        //     setError(json.error);
        //     setEmptyFields(json.emptyFields); // send json the empty fields
        // }
        // if (response.ok){
        //     setError(null);
        //     setName('');
        //     setPassword('');
        //     setUsername('');
        //     setEmptyFields([]);
        //     console.log("new user added", json);
        //     // dispatch({type: 'CREATE_WORKOUT', payload: json});
        //     navigate('/');
        // }
        
    };

    return (
        <div className="create" >
            <form encType="multipart/form-data">
                <h3>Add New</h3>

                <label htmlFor="name">Name: </label>
                <input 
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ''} // if naay name sa emptyfields nga array nga naa sa form e set the classname to error
                />
                
                <label htmlFor="username">Username: </label>
                <input 
                    type="text"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    className={emptyFields.includes('username') ? 'error' : ''}
                />
                
                <label htmlFor="password">Password: </label>
                <input 
                    type="text"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    className={emptyFields.includes('password') ? 'error' : ''}
                />
                <input type="file" 
                    name="image" 
                    id="formupload"
                    onChange={handleImage}
                />
                <div>
                <img className="img-fluid" src={image} width="300" alt="" />
                </div>
                <div className="adedbuttons">
                    <button className="addx" onClick={handleSubmit}>Add</button>
                    <button onClick={() => {navigate("/")}}className="cancel">Cancel</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
      );
}
 
export default UserForm;