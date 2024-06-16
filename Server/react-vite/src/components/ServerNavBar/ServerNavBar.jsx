import { thunkDeleteServer } from "../../redux/server.js";
import ServerNavItem from "../ServerNavItem/ServerNavItem.jsx";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetServers } from "../../redux/server";
import { clearChannels, thunkGetChannels } from "../../redux/channel";
import { clearMembers, thunkGetMembers } from "../../redux/member";
import { clearContents, thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import CreateServerButton from "../CreateServerButton/CreateServerButton.jsx";
// import { clearCurrentServer } from "../../redux/session";




const ServerNavBar = () => {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const serverSlice = useSelector(state => state.servers)
    const currentServer = useSelector(state => state.session.server)

    const handleClick = async () => {
        if (Object.keys(serverSlice).length <= 1) {
            dispatch(clearContents())
            dispatch(clearMembers())
            dispatch(clearChannels())
            await dispatch(thunkDeleteServer(currentServer))
            // navigate('/')
            // console.log("navigated")
        }
        await dispatch(thunkDeleteServer(currentServer))
        dispatch(thunkGetServers())
            .then(async data => {
                let id
                // if (Object.keys(data).length != 0) {
                // console.log(data)
                id = data[Object.keys(data)[0]].id
                // }


                await dispatch(setCurrentServer(id))
                dispatch(thunkGetMembers(id))
                dispatch(thunkGetChannels(id))
                    .then(data => {
                        let id
                        if (Object.keys(data).length != 0) {
                            id = data[Object.keys(data)[0]].id
                        }
                        dispatch(setCurrentChannel(data[Object.keys(data)[0]]))
                        dispatch(thunkGetChannelContents(id))
                        return id
                    })


            })
    }
    return (
        <div className="server-nav-container">
            <div className="nav-bar server-bar">
                {serverSlice[currentServer] && <button onClick={handleClick}>test delete</button>}
                {serverSlice &&
                    Object.keys(serverSlice).map(element => {
                        return <div key={element.id}> <ServerNavItem serverId={element} />

                        </div>
                    })
                }
                <CreateServerButton />
            </div>
        </div>
    )
}

export default ServerNavBar;
