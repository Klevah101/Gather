// import { useSelector } from "react-redux";
// import { useEffect } from "react";
import ServerNavItem from "../ServerNavItem/ServerNavItem.jsx";
import { useSelector } from "react-redux"
// import { thunkGetServers } from "../../redux/server.js";

const ServerNavBar = () => {

    const serverSlice = useSelector(state => state.servers)

    return (
        <div className="server-nav-container">
            <div className="nav-bar server-bar">
                {serverSlice &&
                    Object.keys(serverSlice).map(element => {
                        return <div key={element.id}> <ServerNavItem serverId={element}/></div>
                    })
                }
            </div>
        </div>
    )
}

export default ServerNavBar;
