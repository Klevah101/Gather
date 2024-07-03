import ServerNavBar from "../ServerNavBar/ServerNavBar";
import MemberSection from "../MemberSection/MemberSection";
import ChannelContent from "../ChannelContent/ChannelContent";
import ChannelNavBar from "../ChannelNavBar/ChannelNavBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateServerButton from "../CreateServerButton/CreateServerButton";
import { channelSocket, postSocket, memberSocket, serverSocket } from "../../socket";



const MainPage = ({ reload }) => {
    const serverSlice = useSelector(state => state.servers)
    const channelSlice = useSelector(state => state.channels)
    const memberSlice = useSelector(state => state.members)

    const handleUpdatePost = (data) => {
        reload();
    }

    const handleUpdateMember = (data) => {
        reload();
    }

    const handleUpdateChannel = (data) => {
        reload()
    }

    const handleUpdateServer = (data) => {
        reload();
    }

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
            {serverSlice && <ServerNavBar reload={reload} />}
            {!!Object.keys(channelSlice).length && <ChannelNavBar /> || <div className="create-server-notification">
                <h2 >Create a Server</h2>
                <img src="/pick_server.PNG" alt=""></img>
                <p>create a server by clicking the <CreateServerButton /></p>
            </div>}
            {!!Object.keys(channelSlice).length && <ChannelContent />}
            {!!Object.keys(memberSlice).length && <MemberSection />}
        </div>
    )
}
export default MainPage;
