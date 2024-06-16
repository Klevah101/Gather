import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllServers } from "../../redux/server";
import DiscoveryServer from "./DiscoveryServer";
import { useNavigate } from "react-router-dom";

const FindServerPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const serverSlice = useSelector(state => state.servers)

    const handleCreateServer = () => {
        navigate("/new/server")
    }

    useEffect(async () => {
        await dispatch(thunkGetAllServers())
    }, [dispatch])

    return (
        <div className="server-discovery">
            {/* <h2>Create a new server</h2>
            <button onClick={handleCreateServer}>Create Server</button> */}
            <h2>Discover a Server</h2>
            <div>
                {Object.keys(serverSlice).map(element => {
                    return <div key={element}> <DiscoveryServer server={serverSlice[element]} /></div>
                })}
            </div>
        </div>
    )
}

export default FindServerPage;
