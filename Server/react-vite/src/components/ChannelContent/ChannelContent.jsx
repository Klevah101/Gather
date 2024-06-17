import { useSelector } from "react-redux";
import ChannelContentItem from "../ChannelContentItem/ChannelContentItem";
import ChannelPostBar from "../ChannelPostBar/ChannelPostBar";

const ChannelContent = () => {
    const currentChannel = useSelector(state => state.session.channel)
    // const channleSlice = useSelector(state=>state.channels)
    const contentSlice = useSelector(state => state.contents)
    const memberSlice = useSelector(state => state.members)
    return (
        <div className="mid-section">

            <div className="channel-content-container">
                {/* <h2>Channel Content (post) </h2> */}
                <h2>{currentChannel && currentChannel.label}</h2>
                <div className="nav-bar channel-content-section">
                    {contentSlice && Object.keys(contentSlice).map(element => {
                        return <div key={element.id}> <ChannelContentItem content={contentSlice[element]} previousUser={memberSlice[contentSlice[element].user_id]} /> </div>
                    })}
                </div>

            </div>
            <div className="post-bar">
                <ChannelPostBar />
            </div>
        </div>
    )
}
export default ChannelContent;
