const SET_CONTENTS = 'session/setContents';
// const REMOVE_USER = 'session/removeUser';

const setContents = (contents) => ({
    type: SET_CONTENTS,
    payload: contents
});

// const removeUser = () => ({
//   type: REMOVE_USER
// });

export const thunkGetChannelContents = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
      
        const obj = {};
        const keys = Object.keys(data.channelposts)
        keys.forEach(element => {
            obj[data.channelposts[element].id] = data.channelposts[element]
        });
        dispatch(setContents(obj));
       
    } 
};



const initialState = {};

function channelContentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONTENTS:
            return { ...action.payload };
        default:
            return state;
    }
}

export default channelContentReducer;
