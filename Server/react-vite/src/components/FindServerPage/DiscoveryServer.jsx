import { useDispatch, useSelector } from "react-redux"
import { clearMembers, thunkAddMember } from "../../redux/member"
import { useNavigate } from "react-router-dom";
import { clearServers, thunkGetUserServers } from "../../redux/server";
import { clearChannels } from "../../redux/channel";
const DiscoveryServer = ({ server }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const handleJoin = async (serverId) => {
        // await dispatch(thunkGetUserServers(user.id))
        sessionStorage.removeItem("currentServer")
        sessionStorage.removeItem("currentChannel")
        dispatch(clearMembers())
        dispatch(clearChannels())
        dispatch(clearServers())
        await dispatch(thunkAddMember(serverId))
        navigate('/main')
    }
    return (
        <div className="discovery-item">
            <p>{server.icon}</p>
            <p>{server.name}</p>
            <p>{server.description}</p>
            <button onClick={() => handleJoin(server.id)}>Join</button>
        </div>
    )
}
export default DiscoveryServer
