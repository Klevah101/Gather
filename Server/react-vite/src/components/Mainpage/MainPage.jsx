import ServerNavBar from "../ServerNavBar/ServerNavBar";
import MemberSection from "../MemberSection/MemberSection";
import ChannelContent from "../ChannelContent/ChannelContent";
import ChannelNavBar from "../ChannelNavBar/ChannelNavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetServers } from "../../redux/server";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetMembers } from "../../redux/member";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";
// import EmptyNavBar from "../ChannelNavBar/EmptyNavBar";
import CreateServerButton from "../CreateServerButton/CreateServerButton";



const MainPage = () => {
    const dispatch = useDispatch();

    const serverSlice = useSelector(state => state.servers)
    const channelSlice = useSelector(state => state.channels)
    const memberSlice = useSelector(state => state.members)
    // const postSlice = useSelector(state => state.contents)

    // let showPanels;
    // const loadAll = async () => {

    // }

    console.log(typeof memberSlice)
    useEffect(() => {
        dispatch(thunkGetServers())
            .then(async data => {
                let id
                if (data) {
                    id = data[Object.keys(data)[0]].id
                }


                await dispatch(setCurrentServer(id))
                await dispatch(thunkGetMembers(id))
                await dispatch(thunkGetChannels(id))
                    .then(data => {
                        let id
                        if (data) {
                            id = data[Object.keys(data)[0]].id
                        }
                        dispatch(setCurrentChannel(data[Object.keys(data)[0]]))
                        dispatch(thunkGetChannelContents(id))
                        return id
                    })

            })
    }, [dispatch])



    return (
        < div className="page-layout">
            {serverSlice && <ServerNavBar />}
            {!!Object.keys(channelSlice).length && <ChannelNavBar /> || <div className="create-server-notification">
                <h2 >Create a Server</h2>
                <img src="/pick_server.PNG" alt=""></img>
                <p>create a server by clicking the <CreateServerButton/></p>
            </div>}
            {!!Object.keys(channelSlice).length && <ChannelContent />}
            {/* {postSlice && <ChannelContent />} */}
            {!!Object.keys(memberSlice).length && <MemberSection />}
        </div>
    )
}
export default MainPage;
