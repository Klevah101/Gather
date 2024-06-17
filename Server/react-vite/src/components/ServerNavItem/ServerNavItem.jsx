import { BsQuestionSquare } from "react-icons/bs";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { useDispatch } from "react-redux";
import { thunkGetMembers } from "../../redux/member";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";

const ServerNavItem = ({ serverId, serverUrl }) => {
    const dispatch = useDispatch()
    let showImage = false;
    if (serverUrl.toLowerCase().endsWith('.svg') ||
        serverUrl.toLowerCase().endsWith('.jpg') ||
        serverUrl.toLowerCase().endsWith('.jpeg') ||
        serverUrl.toLowerCase().endsWith('.png')) {
        showImage = true
    }

    return (
        <div >
            <p className="server-nav-item" onClick={async () => {
                console.log(serverId)
                dispatch(setCurrentServer(serverId))
                dispatch(thunkGetMembers(serverId))
                dispatch(thunkGetChannels(serverId))
                    .then(data => {
                        const id = data[Object.keys(data)[0]].id
                        // console.log("this is the id", id)
                        dispatch(setCurrentChannel(data[Object.keys(data)[0]]))
                        dispatch(thunkGetChannelContents(id))
                        // }
                    })
            }}>
                {showImage && <img className="server-image hoverable" src={serverUrl}></img> || <div className="hoverable"><BsQuestionSquare /></div>}
            </p>
        </div>
    )
}

export default ServerNavItem;
