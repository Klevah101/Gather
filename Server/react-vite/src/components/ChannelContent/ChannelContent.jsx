import { useSelector } from "react-redux";
import ChannelContentItem from "../ChannelContentItem/ChannelContentItem";
import ChannelPostBar from "../ChannelPostBar/ChannelPostBar";

const ChannelContent = () => {
    const contentSlice = useSelector(state => state.contents)
    return (
        <div className="channel-content-container">
            <h2>Channel Content (post) </h2>
            <div className="nav-bar channel-content-section">
                {contentSlice && Object.keys(contentSlice).map(element => {
                    return <div key={element.id}> <ChannelContentItem content={contentSlice[element]} /> </div>
                })}
            </div>
            <div className="post-bar">
              <ChannelPostBar />
            </div>
        </div>
    )
}
export default ChannelContent;
