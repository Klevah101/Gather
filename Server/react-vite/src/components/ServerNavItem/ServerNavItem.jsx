import { BsQuestionSquare } from "react-icons/bs";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { useDispatch } from "react-redux";
import { thunkGetMembers } from "../../redux/member";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";

const ServerNavItem = ({ serverId }) => {
    const dispatch = useDispatch()
    return (
        <div >
            <p className="server-nav-item" onClick={async () => {
                dispatch(setCurrentServer(serverId))
                dispatch(thunkGetMembers(serverId))
                dispatch(thunkGetChannels(serverId))
                    .then(data => {
                        const id = data[Object.keys(data)[0]].id
                        dispatch(setCurrentChannel(data[Object.keys(data)[0]]))
                        dispatch(thunkGetChannelContents(id))
                    // }
                    })
            }}>
                <BsQuestionSquare />
            </p>
        </div>
    )
}

export default ServerNavItem;
