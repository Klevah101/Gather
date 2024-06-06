const SET_CONTENTS = 'session/setContents';
const CREATE_CONTENT = 'session/createContent';

const setContents = (contents) => ({
    type: SET_CONTENTS,
    payload: contents
});

const createContent = (content) => ({
    type: CREATE_CONTENT,
    payload: content
});

export const thunkCreateContent = (payload) => async (dispatch) => {
    const response = await fetch(`/api/posts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    if (response.ok) {
        const post = await response.json()
        dispatch(createContent(post))
    }
}

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
        case CREATE_CONTENT:
            return { ...state, [action.payload.id]: action.payload }
        default:
            return state;
    }
}

export default channelContentReducer;
