import { useDispatch } from "react-redux"
import { thunkAddMember } from "../../redux/member"
import { useNavigate } from "react-router-dom";
const DiscoveryServer = ({ server }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleJoin = (serverId) => {
        dispatch(thunkAddMember(serverId))
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
