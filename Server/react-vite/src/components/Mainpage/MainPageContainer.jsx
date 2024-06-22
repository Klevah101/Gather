import MainPage from "./MainPage"
import { thunkGetUserServers } from "../../redux/server";
import { thunkGetChannels } from "../../redux/channel";
import { thunkGetMembers } from "../../redux/member";
import { thunkGetChannelContents } from "../../redux/channelcontent";
import { setCurrentChannel, setCurrentServer } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state)

    // const currentServer = useSelector(state => state.session.server)
    const currentChannel = useSelector(state => state.session.channel)
    const user = useSelector(state => state.session.user)
    const serverSlice = useSelector(state => state.servers)
    const channelSlice = useSelector(state => state.channels)
    const memberSlice = useSelector(state => state.members)
    console.log("page loaded")
    console.table(state)



    const reload = async () => {
        // need to add condition - if !currentserver 
        const prevServer = sessionStorage.getItem("currentServer")
        const prevChannel = sessionStorage.getItem("currentChannel")


        await dispatch(thunkGetUserServers(user.id))
            .then(async data => {
                let id
                if (prevServer) id = prevServer
                else if (data) {
                    id = data[Object.keys(data)[0]].id
                }


                await dispatch(setCurrentServer(id))
                await dispatch(thunkGetMembers(id))
                await dispatch(thunkGetChannels(id))
                    .then(async data => {
                        let id
                        if (data) {
                            id = data[Object.keys(data)[0]].id
                        }

                  
                            dispatch(setCurrentChannel(data[Object.keys(data)[0]]))
                        console.log("Lets see what we have here", data[Object.keys(data)[0]])
                        await dispatch(thunkGetChannelContents(prevChannel))
                        return id
                    })
                // console.table("prev channel:", Object.keys(prevChannel))
            })
    }
    return <MainPage reload={reload} />
}
export default MainPageContainer;
