import { useSelector } from "react-redux"
import UpdatePostButton from "../UpdatePostButton/UpdatePostButton"
import { thunkDeleteContent } from "../../redux/channelcontent"
import { useDispatch } from "react-redux"
const ChannelContentItem = ({ content }) => {
    const dispatch = useDispatch()
    const memberSlice = useSelector(state => state.members)

    const handleClickDeletePost = () => {
        dispatch(thunkDeleteContent(content.id))
    }
    return (
        <div>
            {memberSlice[content.user_id] && <p className="author" >{memberSlice[content.user_id].username}</p>}
            <div className="content-text">
                <p >{content.content}</p>
                <div>
                    <button onClick={handleClickDeletePost}>Delete</button>
                    <UpdatePostButton contentId={content.id} />
                </div>

            </div>
        </div>
    )
}
export default ChannelContentItem
