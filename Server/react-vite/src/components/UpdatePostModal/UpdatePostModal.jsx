import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateContent } from "../../redux/channelcontent";

const UpdatePostModal = ({ id }) => {

    const dispatch = useDispatch()
    const contentSlice = useSelector(state => state.contents)
    const [content, setContent] = useState(contentSlice[id].content)

    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            content
        }
        dispatch(thunkUpdateContent(id, obj))
        // console.log("line 10 UpdatePostModal button click empty")
    }
    return (
        <>

            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Update post</h2>
                    <label>Edit Your Post</label>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} >
                    </input>
                    <button type="submit">Submit</button>
                </form>
            </div>

        </>
    )
}

export default UpdatePostModal;
