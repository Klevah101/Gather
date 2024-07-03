import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllServers, thunkGetUserServers } from "../../redux/server";
import DiscoveryServer from "./DiscoveryServer";
// import { useNavigate } from "react-router-dom";

const FindServerPage = () => {
    // const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const serverSlice = useSelector(state => state.servers)

    let allServers;
    let userServers;
    let serversNotJoined
    // const handleCreateServer = () => {
    //     navigate("/new/server")
    // }

    useEffect(async () => {
        userServers = await dispatch(thunkGetUserServers(user.id))
        allServers = await dispatch(thunkGetAllServers())
    }, [dispatch, serversNotJoined])

    // serversNotJoined = Object.keys(allServers).filter(element =>
    //     Object.keys(userServers).includes(allServers[element].id))



    return (
        <div className="server-discovery">
            {/* <h2>Create a new server</h2>
            <button onClick={handleCreateServer}>Create Server</button> */}
            <h2>Discover a Server</h2>
            <div>
                {Object.keys(serverSlice).map(element => {
                    {/* {serversNotJoined && serversNotJoined.map(element => { */ }
                    return <div key={element}> <DiscoveryServer server={serverSlice[element]} /></div>
                })}
            </div>
        </div>
    )
}

export default FindServerPage;
