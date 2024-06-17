import { useDispatch } from "react-redux"
import { thunkAddMember } from "../../redux/member"
import { useNavigate } from "react-router-dom";
import { thunkGetServers } from "../../redux/server";
const DiscoveryServer = ({ server }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleJoin = async (serverId) => {
        await dispatch(thunkGetServers())
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
