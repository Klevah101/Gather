const SET_CHANNELS = 'session/setChannels';
// const REMOVE_USER = 'session/removeUser';

const setChannels = (channels) => ({
    type: SET_CHANNELS,
    payload: channels
});

// const removeUser = () => ({
//   type: REMOVE_USER
// });

export const thunkGetChannels = (serverId) => async (dispatch) => {
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
        default:
            return state;
    }
}

export default channelReducer;
