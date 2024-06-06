
import { useDispatch } from "react-redux";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel } from "../../redux/session";
const ChannelLabelItem = ({ label,channel}) => {
    const dispatch = useDispatch()

    const handleClick = (channel)=>{
        // console.table(channel)
        dispatch(thunkGetChannelContents(channel.id))
        dispatch(setCurrentChannel(channel))
    }

    return (
        <p onClick={()=>handleClick(channel)}> {label}</p>
    )
}
export default ChannelLabelItem;
