const SET_MEMBERS = 'session/setMembers';
const ADD_MEMBER = 'session/addMember';
const CLEAR_MEMBERS = 'session/clearMembers'

export const clearMembers = () => ({
    type: CLEAR_MEMBERS
})
const setMembers = (members) => ({
    type: SET_MEMBERS,
    payload: members
});

const addMember = (member) => ({
    type: ADD_MEMBER,
    payload: member
});

export const thunkAddMember = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/members`,
        {
            method: 'POST',
            body: JSON.stringify(serverId),
            headers: { 'Content-Type': 'applicationtype/json' }
        }
    )

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        const obj = {};
        const keys = Object.keys(data.members)
        keys.forEach(element => {
            obj[data.members[element].id] = data.members[element]
        });
        dispatch(addMember(obj));
        return obj
    }
}

export const thunkGetMembers = (serverId) => async (dispatch) => {
    if (!serverId) {
        dispatch(clearMembers)
        return
    }
    const response = await fetch(`/api/servers/${serverId}/members`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        const obj = {};
        const keys = Object.keys(data.members)
        keys.forEach(element => {
            obj[data.members[element].id] = data.members[element]
        });
        dispatch(setMembers(obj));
        return obj
    }
};



const initialState = {};

function memberReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MEMBERS:
            return { ...action.payload };
        case ADD_MEMBER:
            return { ...state, [action.payload.id]: action.payload }
        case CLEAR_MEMBERS:
            return {}
        default:
            return state;
    }
}

export default memberReducer;
