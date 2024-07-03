import {io} from 'socket.io-client'

// const URL = 'http://localhost:8000'

// export const socket = io(URL)
// export const channelSocket = io('http://localhost:8000')
// export const channelSocket = io('http://localhost:8000/test')


// uncomment for dev
// export const serverSocket = io('http://localhost:8000/servers')
// export const channelSocket = io('http://localhost:8000/channels')
// export const postSocket = io('http://localhost:8000/posts')
// export const memberSocket = io('http://localhost:8000/members')


// uncomment for production
export const serverSocket = io('https://gatherlive.onrender.com/servers')
export const channelSocket = io('https://gatherlive.onrender.com/channels')
export const postSocket = io('https://gatherlive.onrender.com/posts')
export const memberSocket = io('https://gatherlive.onrender.com/members')
