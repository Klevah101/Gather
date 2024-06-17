
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
        <div> <p className="channel-label-text hoverable" onClick={() => handleClick(channel)}><HiMiniHashtag /> {label}</p></div>

    )
}
export default ChannelLabelItem;
