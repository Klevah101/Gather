import { channelSocket } from "../../socket";
import { useState, useEffect } from 'react';
// import { ConnectionState } from './ConnectionState';
// import { ConnectionManager } from './ConnectionManager';
// import { Events } from "./Events";
// import { MyForm } from './MyForm';
import { thunkGetUserServers } from "../../redux/server";
import { useDispatch } from "react-redux";
const SocketTest = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [isChConnected, setIsChConnected] = useState(channelSocket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }
        function onChConnect() {
            // setIsChConnected(true);
            console.log("connected")
        }
        
        function onChDisconnect() {
            // setIsChConnected(false);
            console.log("disconnected")
        }

        async function onFooEvent(value) {
            const servers = await dispatch(thunkGetUserServers(1))
            setFooEvents(previous => [...previous, servers[1].name]);
        }

        async function onOofEvent(value){
            console.log("event triggered")
            console.table(value)
        }

        // socket.on('connect', onConnect);
        // socket.on('disconnect', onDisconnect);
        // socket.on('foo', onFooEvent);

        channelSocket.on('connect',onChConnect)
        channelSocket.on('disconnect',onChDisconnect)
        channelSocket.on('oof',onOofEvent)

        return () => {
            // socket.off('connect', onConnect);
            // socket.off('disconnect', onDisconnect);
            // socket.off('foo', onFooEvent);
           
            channelSocket.off('connect', onChConnect);
            channelSocket.off('disconnect', onChDisconnect);
            channelSocket.off('oof', onOofEvent);
        };
    }, []);

    return (
        <div className="App">
            {/* <ConnectionState isConnected={isConnected} /> */}
            {/* <Events events={fooEvents} /> */}
            {/* <ConnectionManager /> */}
            {/* <MyForm /> */}
        </div>
    );
}

export default SocketTest;
