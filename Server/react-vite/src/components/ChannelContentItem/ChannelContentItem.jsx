const ChannelContentItem = ({content}) => {

    return (
        <div>
            {/* <p>Channel content goes here</p> */}
            <p>{content.user_id}</p>
            <p>{content.content}</p>
        </div>
    )
}
export default ChannelContentItem
