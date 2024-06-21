import { channelSocket} from "../../socket";

export function ConnectionManager(){
    function connect(){
        socket.connect();
        channelSocket.connect();
    }

    function disconnect(){
        socket.disconnect();
        channelSocket.disconnect();
    }

    return(
        <>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        </>
    );
}
