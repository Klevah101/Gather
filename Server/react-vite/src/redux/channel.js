const SET_CHANNELS = 'session/setChannels';
const CREATE_CHANNEL = "session/createChannel"
// const REMOVE_USER = 'session/removeUser';
const CLEAR_CHANNELS = 'session/clearChannel'

export const clearChannels = () => ({
    type: CLEAR_CHANNELS
})

export const setChannels = (channels) => ({
    type: SET_CHANNELS,
    payload: channels
});

const createChannel = (channel) => ({
    type: CREATE_CHANNEL,
    payload: channel
});

export const thunkCreateChannel = (payload) => async (dispatch) => {
    const response = await fetch(`/api/channels`,
        {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );


    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }
        dispatch(createChannel(data))
        return data
    }
}


export const thunkGetChannels = (serverId) => async (dispatch) => {

    if(!serverId){
       await dispatch(clearChannels())
        return
    }
  
    const response = await fetch(`/api/servers/${serverId}/channels`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        const obj = {};
        const keys = Object.keys(data.channels)
        keys.forEach(element => {
            obj[data.channels[element].id] = data.channels[element]
        });
        dispatch(setChannels(obj));
        return obj
    }
};



const initialState = {};

function channelReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHANNELS:
            return { ...action.payload };
        case CREATE_CHANNEL:
            // active code works but come back to see why commented code is wrong
            // obj = { ...state }
            // obj[action.payload[action.payload.id]] = action.payload
            return { ...state, [action.payload.id]: action.payload };
        case CLEAR_CHANNELS:
            return {}
        default:
            return state;
    }
}

export default channelReducer;
