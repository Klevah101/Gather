import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetServers, thunkUpdateServer } from "../../redux/server";

function UpdateServerModal() {

  const dispatch = useDispatch()
  const serverSlice = useSelector(state => state.servers)
  const currentServer = useSelector(state => state.session.server)
  const [name, setName] = useState(serverSlice[currentServer].name)
  const [description, setDescription] = useState(serverSlice[currentServer].description)
  const [url, setUrl] = useState(serverSlice[currentServer].url)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      description: description,
      icon: url
    }
    await dispatch(thunkUpdateServer(currentServer, payload))
    dispatch(thunkGetServers())
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Update Server Form</h2>
        <label>Server Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} >
        </input>
        <label htmlFor="">Description </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} >
        </textarea>
        <label>Icon URL </label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} >
        </input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateServerModal;
