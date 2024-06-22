
import { useDispatch, useSelector } from "react-redux";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel } from "../../redux/session";
import { HiMiniHashtag } from "react-icons/hi2";
const ChannelLabelItem = ({ label, channel }) => {
    const dispatch = useDispatch()

    const session = useSelector(state => state.session)

    const handleClick = (channel) => {
        sessionStorage.setItem("currentChannel",channel.id)
        // console.table("this is the channel",channel)
        // console.table("this is the stored channel",sessionStorage.getItem("currentChannel"))
        dispatch(thunkGetChannelContents(channel.id))
        dispatch(setCurrentChannel(channel))
        // console.table(session.channel)
    }

    return (
        <div> <p className="channel-label-text hoverable" onClick={() => handleClick(channel)}><HiMiniHashtag /> {label}</p></div>

    )
}
export default ChannelLabelItem;
