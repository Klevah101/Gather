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



const MainPage = () => {
    const dispatch = useDispatch();

    const serverSlice = useSelector(state => state.servers)
    const channelSlice = useSelector(state => state.channels)
    const memberSlice = useSelector(state => state.members)
    const postSlice = useSelector(state => state.contents)
    useEffect(() => {
        dispatch(thunkGetServers())
            .then(data => {
                let id
                if (data) {
                    id = data[Object.keys(data)[0]].id
                }


                dispatch(setCurrentServer(id))
                dispatch(thunkGetMembers(id))
                dispatch(thunkGetChannels(id))
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
            {channelSlice && <ChannelNavBar />}
            {postSlice && <ChannelContent />}
            {memberSlice && <MemberSection />}
        </div>
    )
}
export default MainPage;
