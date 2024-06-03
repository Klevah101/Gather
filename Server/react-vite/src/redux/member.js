const SET_MEMBERS = 'session/setMembers';
// const REMOVE_USER = 'session/removeUser';

const setMembers = (members) => ({
    type: SET_MEMBERS,
    payload: members
});

// const removeUser = () => ({
//   type: REMOVE_USER
// });

export const thunkGetMembers = (serverId) => async (dispatch) => {
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
        default:
            return state;
    }
}

export default memberReducer;
