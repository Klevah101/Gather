import ChannelLabelItem from "../ChannelLabel/ChannelLabelItem";
import { useDispatch, useSelector } from "react-redux";
// import ChannelPostBar from "../ChannelPostBar/ChannelPostBar";
// import { thunkGetChannels } from "../../redux/channel";

const ChannelNavBar = () => {
    // const dispatch = useDispatch()
    const channelSlice = useSelector(state => state.channels)

    return (
        <div className="channel-nav-container">
            <h2>Channel Nav Bar</h2>
            <div className="nav-bar channel-bar">
                <div className="item-list">
                    {channelSlice && Object.keys(channelSlice).map(element => {
                        return <div key={element.id}><ChannelLabelItem label={channelSlice[element].label} channel={channelSlice[element]}/></div>
                    })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default ChannelNavBar;
