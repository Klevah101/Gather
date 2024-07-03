import MainPage from "./MainPage"
import { thunkGetUserServers } from "../../redux/server";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetMembers } from "../../redux/member";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentServer } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";

const MainPageContainer = () => {

    window.addEventListener('beforeunload', function () {
        sessionStorage.clear();
    });

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)




    const reload = async () => {
        // need to add condition - if !currentserver 
        const prevServer = sessionStorage.getItem("currentServer")
        let prevChannel = sessionStorage.getItem("currentChannel")


        const servers = await dispatch(thunkGetUserServers(user.id))

        console.table("Keeeeeeeeeeeeyyysssss", servers[Object.keys(servers)[0]].id)
        let serverId
        if (prevServer) serverId = prevServer
        else {
            // console.log(servers, "-----------------------")
            try {
                serverId = servers[Object.keys(servers)[0]].id
                sessionStorage.setItem("currentServer", serverId)
            } catch (e) {

            }
        }


        // console.log("serverId", serverId)

        await dispatch(setCurrentServer(serverId)) // will not need in future
        await dispatch(thunkGetMembers(serverId))
        let channels = await dispatch(thunkGetChannels(serverId))
        console.log("channels", channels)

        if (!prevChannel) {
            // get the first channel that have a matching the server_id with current server

            let channelKeys = Object.keys(channels);
            console.log("channel keys", channelKeys)
            prevChannel = parseInt(channelKeys[0])
            sessionStorage.setItem("currentChannel", prevChannel)
        }
        await dispatch(thunkGetChannelContents(prevChannel))

    }


    const reloadChannels = async () => {
        await dispatch(thunkGetChannelContents(sessionStorage.getItem("currentChannel")))
    }
    reload();
    return <MainPage reload={reload} reloadChannels={reloadChannels} />
}
export default MainPageContainer;
