import {io} from 'socket.io-client'

const URL = 'http://localhost:8000'

// export const socket = io(URL)
// export const channelSocket = io('http://localhost:8000')
// export const channelSocket = io('http://localhost:8000/test')

export const serverSocket = io('http://localhost:8000/servers')
export const channelSocket = io('http://localhost:8000/channels')
export const postSocket = io('http://localhost:8000/posts')
export const memberSocket = io('http://localhost:8000/members')
