import { thunkDeleteServer } from "../../redux/server.js";
import ServerNavItem from "../ServerNavItem/ServerNavItem.jsx";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetUserServers } from "../../redux/server";
import { clearChannels, thunkGetChannels } from "../../redux/channel";
import { clearMembers, thunkGetMembers } from "../../redux/member";
import { clearContents, thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";
// import { useNavigate } from "react-router-dom";
import CreateServerButton from "../CreateServerButton/CreateServerButton.jsx";
// import { clearCurrentServer } from "../../redux/session";
import { CiCircleMinus } from "react-icons/ci";




const ServerNavBar = ({ reload }) => {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const serverSlice = useSelector(state => state.servers)
    const currentServer = sessionStorage.getItem("currentServer")
    // const currentServer = useSelector(state => state.session.server)

    const handleDeleteServer = async () => {
        if (Object.keys(serverSlice).length <= 1) {
            // dispatch(clearContents())
            // dispatch(clearMembers())
            // dispatch(clearChannels())
            await dispatch(thunkDeleteServer(currentServer))

            // navigate('/')
            // console.log("navigated")
        }
        await dispatch(thunkDeleteServer(currentServer))

        sessionStorage.removeItem("currentServer")
        sessionStorage.removeItem("currentChannel")
        reload();
    }
    console.table(serverSlice)

    return (
        <div className="server-nav-container">
            <div className="nav-bar server-bar">
                {/* {serverSlice[currentServer] && <button onClick={handleDeleteServer} className="delete-server-button"><CiCircleMinus /></button>} */}
                {serverSlice &&
                    Object.keys(serverSlice).map(element => {
                        return <div key={element.id}> <ServerNavItem serverId={element} serverUrl={serverSlice[element].icon} />
                        </div>
                    })}
                <div className="hoverable">
                    <CreateServerButton />
                </div>
            </div>
        </div>
    )
}

export default ServerNavBar;
