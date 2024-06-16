import { useEffect, useState } from "react";
import ChannelLabelItem from "../ChannelLabel/ChannelLabelItem";
import { useDispatch, useSelector } from "react-redux";
import { clearChannels, thunkCreateChannel, thunkGetChannels } from "../../redux/channel";
import UpdateServerButton from "../UpdateServerButton/UpdateServerButton";
// import ChannelPostBar from "../ChannelPostBar/ChannelPostBar";
// import { thunkGetChannels } from "../../redux/channel";
// import { clearChannels, thunkGetChannels } from "../../redux/channel";
import { clearMembers, thunkGetMembers } from "../../redux/member";
import { clearContents, thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";
import CurrentUserSection from "../CurrentUserSection/CurrentUserSection";
import { useNavigate } from "react-router-dom";
import { thunkDeleteServer } from "../../redux/server";
import { MdOutlineFiberNew } from "react-icons/md";

const ChannelNavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const serverSlice = useSelector(state => state.servers)
    const channelSlice = useSelector(state => state.channels)
    const currentServer = useSelector(state => state.session.server)
    // const user = useSelector(state => state.session.user)
    const [hide, setHide] = useState("hide")
    const [newChannelText, setNewChannelText] = useState("")
    const handleNewChannelSubmit = async (e) => {
        if (e.key == 'Enter') {
            const payload = {
                label: e.target.value,
                server_id: currentServer
            }
            await dispatch(thunkCreateChannel(payload))
            dispatch(thunkGetChannels(currentServer))
            setHide("hide")
            setNewChannelText("")
        }
    }



    const handleClick = async () => {
        if (Object.keys(serverSlice).length <= 1) {
            dispatch(clearContents())
            dispatch(clearMembers())
            dispatch(clearChannels())
            await dispatch(thunkDeleteServer(currentServer))
            navigate('/')
        }
        await dispatch(thunkDeleteServer(currentServer))
        dispatch(thunkGetServers())
            .then(data => {
                let id
                if (Object.keys(data).length != 0) {
                    console.log(data)
                    id = data[Object.keys(data)[0]].id
                }


                dispatch(setCurrentServer(id))
                dispatch(thunkGetMembers(id))
                dispatch(thunkGetChannels(id))
                    .then(data => {
                        let id
                        if (Object.keys(data).length != 0) {
                            id = data[Object.keys(data)[0]].id
                        }
                        dispatch(setCurrentChannel(data[Object.keys(data)[0]]))
                        dispatch(thunkGetChannelContents(id))
                        return id
                    })


            })
    }

    // const showButton = (() => {
    //     if (serverSlice[currentServer] && user && currentServer) return user.id == serverSlice[currentServer].admin
    //     return false
    // })()


    // console.table(serverSlice[currentServer])
    return (<div className="channel-col">

        <div className="channel-nav-container">
            {/* <h2>Channel Nav Bar</h2> */}
            {serverSlice[currentServer] && <div className="channel-header">
            {/* <p>Server</p> */}
                <h2 className="server-title"> {serverSlice[currentServer].name}<UpdateServerButton /></h2>
                {/* <button onClick={handleClick}>test delete</button> */}               
            </div>
            }
            {/* {showButton && <> */}
        
            <button className="new-channel-btn"onClick={() => { setHide("") }}><MdOutlineFiberNew /></button>
            {/* </>} */}
            <div className="nav-bar channel-bar">
                <div className="item-list">
                    {channelSlice && Object.keys(channelSlice).map(element => {
                        return <div className="channel-list" key={element.id}><ChannelLabelItem label={channelSlice[element].label} channel={channelSlice[element]} /></div>
                    })
                    }
                </div>
            </div>
            <input className={`{channel-input ${hide}`} value={newChannelText} type="text" placeholder="Enter Channel Name..." onKeyUp={(e) => handleNewChannelSubmit(e)} onChange={(e) => setNewChannelText(e.target.value)}></input>
        </div>
        <div className="user-section">
            <CurrentUserSection />
        </div>
    </div>
    )
}

export default ChannelNavBar;
