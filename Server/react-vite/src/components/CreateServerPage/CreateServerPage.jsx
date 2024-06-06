import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateServer } from "../../redux/server";

const CreateServerPage = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [icon, setIcon] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            name, description, icon
        }
        dispatch(thunkCreateServer(obj))
        // should navigate you to the newly created server
    }
    return (
        <div>
            <h2>Create Server Page</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={name} placeholder="Enter a name for your server" onChange={(e) => setName(e.target.value)}></input>
                <textarea value={description} placeholder="Enter a description for your server" onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type="text" value={icon} placeholder="Enter a url for your server icon" onChange={(e) => setIcon(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateServerPage;
