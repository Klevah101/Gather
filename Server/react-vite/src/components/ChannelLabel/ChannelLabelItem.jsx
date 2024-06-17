
import { useDispatch } from "react-redux";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel } from "../../redux/session";
import { HiMiniHashtag } from "react-icons/hi2";
const ChannelLabelItem = ({ label, channel }) => {
    const dispatch = useDispatch()

    const handleClick = (channel) => {
        dispatch(thunkGetChannelContents(channel.id))
        dispatch(setCurrentChannel(channel))
    }

    return (
        <p className="channel-label-text" onClick={() => handleClick(channel)}><HiMiniHashtag /> {label}</p>
    
    )
}
export default ChannelLabelItem;
