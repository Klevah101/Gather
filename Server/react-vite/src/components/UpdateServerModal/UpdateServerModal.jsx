import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserServers, thunkUpdateServer, thunkDeleteServer } from "../../redux/server";
import { setCurrentServer } from "../../redux/session";
import { thunkGetMembers } from "../../redux/member";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { useModal } from "../../context/Modal";


function UpdateServerModal(reload = { reload }) {

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const serverSlice = useSelector(state => state.servers)
  const currentServer = sessionStorage.getItem("currentServer")
  const [name, setName] = useState(serverSlice[currentServer].name)
  const [description, setDescription] = useState(serverSlice[currentServer].description)
  const [icon, setIcon] = useState(serverSlice[currentServer].icon)
  const { closeModal } = useModal();


  // const reload = async () => {
  //   const prevServer = sessionStorage.getItem("currentServer")
  //   let prevChannel = sessionStorage.getItem("currentChannel")


  //   const servers = await dispatch(thunkGetUserServers(user.id))

  //   console.table("Keeeeeeeeeeeeyyysssss", servers[Object.keys(servers)[0]].id)
  //   let serverId
  //   if (prevServer) serverId = prevServer
  //   else {
  //     // console.log(servers, "-----------------------")
  //     try {
  //       serverId = servers[Object.keys(servers)[0]].id
  //       sessionStorage.setItem("currentServer", serverId)
  //     } catch (e) {

  //     }
  //   }


  //   // console.log("serverId", serverId)

  //   await dispatch(setCurrentServer(serverId)) // will not need in future
  //   await dispatch(thunkGetMembers(serverId))
  //   let channels = await dispatch(thunkGetChannels(serverId))
  //   console.log("channels", channels)

  //   if (!prevChannel) {
  //     // get the first channel that have a matching the server_id with current server

  //     let channelKeys = Object.keys(channels);
  //     console.log("channel keys", channelKeys)
  //     prevChannel = parseInt(channelKeys[0])
  //     sessionStorage.setItem("currentChannel", prevChannel)
  //   }
  //   await dispatch(thunkGetChannelContents(prevChannel))
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value)
    if (e.target.value === "submit") {

      const payload = {
        name: name,
        description: description,
        icon: icon
      }
      await dispatch(thunkUpdateServer(currentServer, payload))
      dispatch(thunkGetUserServers(user.id))
      closeModal();
    }
    if (e.target.value === "delete" && serverSlice[currentServer].admin === user.id) {
      closeModal();
      await dispatch(thunkDeleteServer(currentServer))

      sessionStorage.removeItem("currentServer")
      sessionStorage.removeItem("currentChannel")
      reload();
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <h2>Update Server Form</h2>
        <label>Server Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} >
        </input>
        <label htmlFor="">Description </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} >
        </textarea>
        <label>Icon URL </label>
        <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} >
        </input>
        <button type="" onClick={(e) => handleSubmit(e)} value="submit">Submit</button>
        <button type="" onClick={(e) => handleSubmit(e)} value="delete">Delete</button>
      </form>
    </div>
  );
}

export default UpdateServerModal;
