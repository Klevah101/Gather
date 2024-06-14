const SET_USER_SERVERS = 'session/getUserServers';
const CREATE_SERVER = 'session/createServer';
const GET_ALL_SERVERS = 'session/getAllServers';
const UPDATE_SERVER = 'session/updateServer';
const DELETE_SERVER = 'session/deleteServer';
const CLEAR_SERVERS = 'session/clearServers'

export const clearServers = () => ({
  type: CLEAR_SERVERS
})
const deleteServer = (server) => ({
  type: DELETE_SERVER,
  payload: server
})

const getUserServers = (servers) => ({
  type: SET_USER_SERVERS,
  payload: servers
});

const createServer = (server) => ({
  type: CREATE_SERVER,
  payload: server
});

const getAllServers = (servers) => ({
  type: GET_ALL_SERVERS,
  payload: servers
})

const updateServer = (server) => ({
  type: UPDATE_SERVER,
  payload: server
})

export const thunkDeleteServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    // const data=await response.json()// only need this if I return the id from the server
    dispatch(deleteServer(id))
  }
}

export const thunkUpdateServer = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      return
    }
    dispatch(updateServer(data))
  }
}

export const thunkGetAllServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/all")
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return
    }
    const obj = {}
    const keys = Object.keys(data.servers)
    keys.forEach(element => {
      obj[data.servers[element].id] = data.servers[element]
    })
    dispatch(getAllServers(obj))
    return obj
  }
}

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
    dispatch(getUserServers(obj));
    return obj
  }
};

export const thunkCreateServer = (payload) => async (dispatch) => {
  const response = await fetch("/api/servers",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  if (response.ok) {
    const server = await response.json()
    dispatch(createServer(server))
  }
}


const initialState = {};
let obj = {}
function serverReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_SERVERS:
      return { ...action.payload };
    case CREATE_SERVER:
      return { ...state, [action.payload.id]: action.payload }
    case GET_ALL_SERVERS:
      return { ...action.payload }
    case UPDATE_SERVER:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_SERVER:
      obj = { ...state }
      delete obj[action.payload]
      return obj
    case CLEAR_SERVERS:
      return null
    default:
      return state;
  }
}

export default serverReducer;
