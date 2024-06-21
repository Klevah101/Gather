import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateContent } from "../../redux/channelcontent";
import { postSocket } from "../../socket";


const ChannelPostBar = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState("");
    const currentChannel = useSelector(state => state.session.channel)
    const sendPost = async (e) => {
        // dispatch()

        if (e.key === 'Enter') {
            const obj = {
                channel_id: currentChannel.id,
                content: post
            }
            await dispatch(thunkCreateContent(obj))
            setPost("")

            const obj2 = { "message": "This is my test" }
            postSocket.emit('new_post', obj2)
            // socket.timeout(5000).emit('new_post')
        }

    }

    return (
        <>
            <input type="text" value={post} placeholder="Leave a post" onChange={(e) => setPost(e.target.value)} onKeyUp={(e) => sendPost(e)}></input>
        </>
    )
}
export default ChannelPostBar;
