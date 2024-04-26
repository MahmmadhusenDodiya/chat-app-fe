// React Arrow Function Export Component
// Use Client must be added to top when we use useState and useEffect
'use client'
import React, { useState, useEffect } from 'react'
import io, { Socket } from "socket.io-client"
import { useAuthStore } from '../zustand/useAuthStore';
import { useUserStore } from '../zustand/useUsersStore';
import axios from 'axios';
import ChatUsers from '../_components/chatUsers';

const Chat = () => {

    // React hooks that will mange state of variable and when it changes entire component who contain it will also re render 
    const [msg, setMsg] = useState('');
    const [socket, setSocket] = useState(null);
    const [msgs, setMsgs] = useState([]);
    const { authName } = useAuthStore();
    const { updateUsers } = useUserStore();

    useEffect(() => {

        console.log("Chat called ::: --------------------------");
        // Establish WebSocket connection
        const newSocket = io('http://localhost:8080', {
            query: {
                username: authName
            }
        });
        setSocket(newSocket);

        const getUserData = async () => {
            console.log("before users users users");
            const res = await axios.get("http://localhost:5000/users", {
                withCredentials: true    // passing cookies aswell
            });
            updateUsers(res.data);
            console.log(res.data);
            console.log("THis is dataatatatataattata");
        };
        getUserData();

        //listen the message 
        newSocket.on('chat msg', (msg) => {
            console.log("receiver of message=" + msg.sender);
            console.log("msgs=" + msgs + "  ||   New message=" + msg.textMsg);

            let newmsgs = [...msgs, msg];
            // add the message on top
            //setMsgs(msgs=>[...msgs,msg]);
            // for(let i=0;i<newmsgs.length;i++)
            // {
            //     console.log("this is text "+newmsgs[i]);
            // }
            setMsgs(msgs => [...msgs, { text: msg.textMsg, sentByCurrentUser: false }]);
            console.log("total =" + [...msgs, { text: msg.textMsg, sentByCurrentUser: false }]);

        });


        // Clean up function
        return () => newSocket.close();
    }, []);


    const sendMsg = (e) => {
        e.preventDefault();
        if (socket) {

            const messageToBeSent = {
                textMsg: msg,
                sender: authName,
                receiver: "Raju"
            }
            socket.emit('chat msg', messageToBeSent);
            // Reason of Aerro ????
            setMsgs(msgs => [...msgs, { text: msg, sentByCurrentUser: true }]);
            setMsg('');
        }
    }

    return (
        <div className='h-screen flex divide-x-4'>
            <div className='w-1/5'>
                <ChatUsers/>
            </div>
            <div className='w-4/5 flex flex-col'>

                {/* overflow-scroll */}
                <div className='msgs-container h-4/5 '>
                    {
                        msgs.map((msg, index) => (
                            <div key={index} className={`p-1 m-5 ${msg.sentByCurrentUser ? 'text-right' : 'text-left'}`}>
                                <span className={`p-3 rounded-lg ${msg.sentByCurrentUser ? 'bg-blue-200' : 'bg-red-200'}`} >
                                    {msg.text}
                                </span>
                            </div>
                        ))
                    }
                </div>

                <div className='h-1/5 flex items-center justify-center'>
                    <form onSubmit={sendMsg} className="w-4/5 mx-auto my-10">
                        <div className="relative">
                            <input type="text"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Type your text here"
                                required
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Chat 