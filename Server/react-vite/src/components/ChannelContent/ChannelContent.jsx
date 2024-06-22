import { useSelector } from "react-redux";
import ChannelContentItem from "../ChannelContentItem/ChannelContentItem";
import ChannelPostBar from "../ChannelPostBar/ChannelPostBar";
import { useRef } from "react";

const ChannelContent = () => {
    const endRef = useRef();
    const session = useSelector(state => state.session)
    // const currentChannel = useSelector(state => state.session.channel)
    const currentChannel = sessionStorage.getItem("currentChannel")
    const channleSlice = useSelector(state=>state.channels)
    const contentSlice = useSelector(state => state.contents)
    const memberSlice = useSelector(state => state.members)

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView()
        // console.log('------------------------------------')
        // console.table(session.channel)
    }
    endRef.current && endRef.current?.scrollIntoView()
    return (
        <div className="mid-section">

            <div className="channel-content-container">
                {/* <h2>Channel Content (post) </h2> */}
                <h2>{currentChannel && channleSlice[currentChannel].label}</h2>
                <div className="nav-bar channel-content-section">
                    {contentSlice && Object.keys(contentSlice).map(element => {
                        if (element == Object.keys(contentSlice)[Object.keys(contentSlice).length - 1]) {
                            return <>
                                <div key={element.id}> <ChannelContentItem content={contentSlice[element]} previousUser={memberSlice[contentSlice[element].user_id]} /> </div>
                                <div ref={endRef} id="postend">
                                </div>
                                {endRef.current?.scrollIntoView()}
                            </>
                        }
                        return <div key={element.id}> <ChannelContentItem content={contentSlice[element]} previousUser={memberSlice[contentSlice[element].user_id]} /> </div>
                    })}

                </div>


            </div>
            <div className="post-bar">
                <ChannelPostBar scrollToBottom={scrollToBottom} />
            </div>
        </div>
    )
}
export default ChannelContent;
