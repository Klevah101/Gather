const SET_SERVERS = 'session/setServers';
// const REMOVE_USER = 'session/removeUser';

const setServers = (servers) => ({
  type: SET_SERVERS,
  payload: servers
});

// const removeUser = () => ({
//   type: REMOVE_USER
// });

export const thunkGetServers = () => async (dispatch) => {
  const response = await fetch("/api/servers");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    const obj = {};
    const keys = Object.keys(data.servers)
    keys.forEach(element => {
      obj[data.servers[element].id] = data.servers[element]
    });
    dispatch(setServers(obj));
    return obj
  }
};

// export const thunkLogin = (credentials) => async dispatch => {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials)
//   });

//   if(response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// };

// export const thunkSignup = (user) => async (dispatch) => {
//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   });

//   if(response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// };

// export const thunkLogout = () => async (dispatch) => {
//   await fetch("/api/auth/logout");
//   dispatch(removeUser());
// };

const initialState = {};

function serverReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVERS:
      return { ...action.payload };
    default:
      return state;
  }
}

export default serverReducer;
