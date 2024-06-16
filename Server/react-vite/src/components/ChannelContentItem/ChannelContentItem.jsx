import { useSelector } from "react-redux"
import UpdatePostButton from "../UpdatePostButton/UpdatePostButton"
import { thunkDeleteContent } from "../../redux/channelcontent"
import { useDispatch } from "react-redux"
import { RiDeleteBin2Fill } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";
const ChannelContentItem = ({ content }) => {
    const dispatch = useDispatch()
    const memberSlice = useSelector(state => state.members)
    const user = useSelector(state => state.session.user)

    const handleClickDeletePost = () => {
        dispatch(thunkDeleteContent(content.id))
    }

    const showButton = (() => {
        if (memberSlice[content.user_id]) return user.id == memberSlice[content.user_id].id
    })()


    return (
        <div>
            {memberSlice[content.user_id] && <p className="author" >{memberSlice[content.user_id].username}</p>}
            <div className="content-text">
                <p >{content.content}</p>
                <div>
                    <div className="button-icon"> {showButton && <button className="button-icon" onClick={handleClickDeletePost}><RiDeleteBin2Fill /></button>}
                        {showButton && <UpdatePostButton contentId={content.id} />}</div>
                </div>

            </div>
        </div>
    )
}
export default ChannelContentItem
