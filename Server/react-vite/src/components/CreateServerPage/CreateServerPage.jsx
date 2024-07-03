import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateServer } from "../../redux/server";
import { useNavigate } from "react-router-dom";

const CreateServerPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [icon, setIcon] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            name, description, icon
        }
        await dispatch(thunkCreateServer(obj))
        navigate('/');
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Create Server Page</h2>
                <label>Name</label>
                <input type="text" value={name} placeholder="Enter a name for your server" onChange={(e) => setName(e.target.value)}></input>
                <textarea value={description} placeholder="Enter a description for your server" onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type="text" value={icon} placeholder="Enter a url for your server icon" onChange={(e) => setIcon(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateServerPage;
