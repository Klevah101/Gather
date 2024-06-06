import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateContent } from "../../redux/channelcontent";

const ChannelPostBar = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState("");
    const currentChannel = useSelector(state => state.session.channel)
    const sendPost = (e) => {
        // dispatch()

        if (e.key === 'Enter') {
            const obj = {
                channel_id:currentChannel.id,
                content:post
            }
            dispatch(thunkCreateContent(obj))
            console.log(`you pressed ${e.key}`)
            console.log(`the id is ${currentChannel.id}`)
            setPost("")
        }

    }

    return (
        <input type="text" value={post} placeholder="Leave a post" onChange={(e) => setPost(e.target.value)} onKeyUp={(e) => sendPost(e)}></input>
    )
}
export default ChannelPostBar;
