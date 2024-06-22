import ServerNavBar from "../ServerNavBar/ServerNavBar";
import MemberSection from "../MemberSection/MemberSection";
import ChannelContent from "../ChannelContent/ChannelContent";
import ChannelNavBar from "../ChannelNavBar/ChannelNavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserServers } from "../../redux/server";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetMembers } from "../../redux/member";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";
// import EmptyNavBar from "../ChannelNavBar/EmptyNavBar";
import CreateServerButton from "../CreateServerButton/CreateServerButton";
import { channelSocket, postSocket, memberSocket, serverSocket } from "../../socket";



const MainPage = ({reload}) => {
    const dispatch = useDispatch();

    const state = useSelector(state => state)
    const currentServer = useSelector(state => state.session.server)
    const currentChannel = useSelector(state => state.session.channel)
    const user = useSelector(state => state.session.user)
    const serverSlice = useSelector(state => state.servers)
    const channelSlice = useSelector(state => state.channels)
    const memberSlice = useSelector(state => state.members)
    // const postSlice = useSelector(state => state.contents)

    // let showPanels;
    // const loadAll = async () => {

    // }

   

  

    const handleUpdatePost = (data) => {
        reload();
    }

    const handleUpdateMember = (data) => {
        // console.table(data)
        reload();
    }

    const handleUpdateChannel = (data) => {
        // console.table(data)
        reload()
    }

    const handleUpdateServer = (data) => {
        // console.table(data)
        reload();
    }

    // console.table(serverSlice)
    useEffect(() => {
        reload();

        serverSocket.on('update_server', handleUpdateServer)
        channelSocket.on('update_channel', handleUpdateChannel)
        postSocket.on('update_post', handleUpdatePost)
        memberSocket.on('update_member', handleUpdateMember)

        return () => {
            serverSocket.off('update_server', handleUpdateServer)
            channelSocket.off('update_channel', handleUpdateChannel)
            postSocket.off('update_post', handleUpdatePost)
            memberSocket.off('update_member', handleUpdateMember)
        }
    }, [])



    return (
        < div className="page-layout">
            {serverSlice && <ServerNavBar />}
            {!!Object.keys(channelSlice).length && <ChannelNavBar /> || <div className="create-server-notification">
                <h2 >Create a Server</h2>
                <img src="/pick_server.PNG" alt=""></img>
                <p>create a server by clicking the <CreateServerButton /></p>
            </div>}
            {!!Object.keys(channelSlice).length && <ChannelContent />}
            {/* {postSlice && <ChannelContent />} */}
            {!!Object.keys(memberSlice).length && <MemberSection />}
        </div>
    )
}
export default MainPage;
