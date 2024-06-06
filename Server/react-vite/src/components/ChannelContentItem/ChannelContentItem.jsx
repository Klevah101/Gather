import { useSelector } from "react-redux"
const ChannelContentItem = ({ content }) => {
    const memberSlice = useSelector(state => state.members)
    const contentSlice = useSelector(state => state.contents)
    // console.log("--------------------------------------------------------")
    // console.table(memberSlice)
    // console.log("--------------------------------------------------------")
    // console.table(contentSlice)
    // console.log("--------------------------------------------------------")
    // console.table([userId])

    // const userId
    const obj = { ...memberSlice }
    Object.keys(memberSlice).forEach(element => {
        console.log(memberSlice[element].username)
        console.log(element == content.user_id)

        console.log(element)
        console.log(content.user_id)
        //     // let temp = content.user_id.toString()
        //     // console.log(content.user_id.toString())
        //     // console.log(temp)
        //     // console.log(obj[1].username)
    }
    )
    // console.table(userId)
    // console.table(memberSlice[""+userId[0]+""])

    return (
        <div>
            {/* <p>Channel content goes here</p> */}
            <p>{memberSlice[content.user_id].username}</p>
            <p>{content.content}</p>
            {/* <p>{user[0].username}</p> */}
            {/* {Object.keys(memberSlice).map((element,index) => {
                return <div key={element}> <p>{element}{index}</p></div>
            })} */}
        </div>
    )
}
export default ChannelContentItem
