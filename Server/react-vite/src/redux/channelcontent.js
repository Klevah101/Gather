const SET_CONTENTS = 'session/setContents';
const CREATE_CONTENT = 'session/createContent';
const CLEAR_CONTENTS = 'session/clearContent';
const UPDATE_CONTENT = 'session/updateContent';
const DELETE_CONTENT = 'session/deleteContent';

const deleteContent = (content) => ({
    type: DELETE_CONTENT,
    payload: content
})
const updateContent = (content) => ({
    type: UPDATE_CONTENT,
    payload: content
})
export const clearContents = () => ({
    type: CLEAR_CONTENTS
})

const setContents = (contents) => ({
    type: SET_CONTENTS,
    payload: contents
});

const createContent = (content) => ({
    type: CREATE_CONTENT,
    payload: content
});


export const thunkDeleteContent = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    })

    if (response.ok) {

        const data = await response.json()

        dispatch(deleteContent(data))
    }
}
export const thunkUpdateContent = (id, paylaod) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paylaod),
        method: 'PUT'
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return
        }
        dispatch(updateContent(data))
    }
}


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
let obj = {}
function channelContentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONTENTS:
            return { ...action.payload };
        case CREATE_CONTENT:
            return { ...state, [action.payload.id]: action.payload }
        case CLEAR_CONTENTS:
            return null
        case UPDATE_CONTENT:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_CONTENT:
            obj = { ...state }
            delete obj[action.payload.id]
            return obj
        default:
            return state;
    }
}

export default channelContentReducer;
