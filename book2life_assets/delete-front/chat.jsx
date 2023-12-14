//cet exemple a été fait sur la page App.js

//npm i socket.io-client
import io from 'socket.io-client';
import {useEffect, usestate} from "react";
const socket = io.connect("http://localhost:3001");

const Chat = (props) =>{
    //Room state
    const [room, setRoom] = usestate("");

    //Message States
    const [message, setMessage] = usestate("");
    const [messageReceived, setMessageReceived] = usestate("");

    //avec room: joinRoom + sendMessage
    const joinRoom = () => {
        if (room !== ""){
            socket.emit("join_room", room);
        }
    } 

    //sans room uniquement sendMessage
    const sendMessage = () => {
        //socket.emit("send_message", {message: "Hello"});

        //sans room
        socket.emit("send_message", {message});

        //Avec room  il faut rajouter room
        socket.emit("send_message", {message, room});
    }

    useEffect(()=> {
        socket.on("receive_message", (data) => {
            //alert(data.message)
            setMessageReceived(data.message)
        })
    }, [socket]);

    return (
        <div className="socketIo">
            <input 
                placeholder ="Room  Number..." 
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
            />
            <button onclick={joinRoom}> Join Room</button>

            <input 
                placeholder ="Message..." 
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onclick={sendMessage}> Send message</button>
            <h1>Message: </h1>
            {messageReceived}
        </div>
    )
}

export default Chat
