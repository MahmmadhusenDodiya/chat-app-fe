// React Arrow Function Export Component
// Use Client must be added to top when we use useState and useEffect
'use client';
import React, { useState, useEffect } from 'react';
import io, { Socket } from "socket.io-client";
import { useAuthStore } from '../zustand/useAuthStore';
import { useUserStore } from '../zustand/useUsersStore';
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore';
import axios from 'axios';
import ChatUsers from '../_components/chatUsers';
import { redirect } from 'next/navigation';


const Chat = () => {

    // React hooks that will mange state of variable and when it changes entire component who contain it will also re render 


    //current message that is sending
    const [msg, setMsg] = useState('');

    //Socket State
    const [socket, setSocket] = useState(null);


    const [msgs, setMsgs] = useState([]);
    const { authName } = useAuthStore();
    const { updateUsers } = useUserStore();
    const {chatReceiver} =useChatReceiverStore();
    const {chatMsgs,updateChatMsgs}=useChatMsgsStore();

    useEffect(() => {

        if(!authName)
        {
            console.log("user login data not found so going back to home");
            console.log('redirecting');
            redirect("/");
        }
        console.log("Chat called ::: --------------------------");
        // Establish WebSocket connection
        const newSocket = io('http://localhost:8080', {
            query: {
                username: authName
            }
        });
        setSocket(newSocket);

        const getUserData = async () => {
            console.log("Get List of All users");

            const res = await axios.get("http://localhost:8081/users", {
                withCredentials: true
            });
            updateUsers(res.data);
            console.log("this is list of users "+res.data);
            console.log(res.data);
        };
        getUserData();

        //listen the message 
        newSocket.on('chat msg', (msg) => {
            console.log("Sender of message=" + msg.sender);
            console.log("receiver of message ="  + msg.receiver + " Text of New message = " + msg.text);

            // let newmsgs = [...msgs, msg];
            // console.log("-------------Printing Old messages -------------@@@");
            // for(let x=0;x<chatMsgs.length;x++)
            // {
            //     console.log(chatMsgs[i]);
            // }
            // console.log("--------------- Old Message Ended -------------------@@@");



            // console.log("this is chat messages ="+{chatMsgs});
            // console.log("1 Before Lenght ="+chatMsgs.length);
            // if(!chatMsgs) console.log("Chat message are null");
            // else console.log("chat messages are not null and its type="+typeof(chatMsgs));

            // let messageArr=chatMsgs;
            // console.log("after initalization All Operations Lenght ="+messageArr.length);
            // console.log("new Message arr = "+messageArr);
            // messageArr.push(msg);
            // console.log("new message arr after pushing new element is"+messageArr);
            // updateChatMsgs(messageArr);
            updateChatMsgs([msg]);
            // console.log("After All Operations Lenght ="+messageArr.length);
        });


        // Clean up function
        return () => newSocket.close();
    }, []);


    const sendMsg = (e) => {
        e.preventDefault();
        console.log("send message called");
        if (socket) {

            const messageToBeSent = {
                text: msg,
                sender: authName,
                receiver: chatReceiver
            }
            console.log(typeof(messageToBeSent));
            socket.emit('chat msg', messageToBeSent);
            // setMsgs(msgs => [...msgs, { text: msg, sentByCurrentUser: true }]);

            console.log("When we send message before adding element length of arr="+chatMsgs.length);
            // updateChatMsgs([...chatMsgs,messageToBeSent]);
            updateChatMsgs([messageToBeSent]);
            console.log("When we send message after adding element length of arr="+chatMsgs.length);

          //updateChatMsgs([...chatMsgs,msg]);
            setMsg('');
        }
    }

    return (
        <div className='h-screen flex divide-x-4'>
            <div className='w-1/5'>
                <ChatUsers/>
            </div>
            <div className='w-4/5 flex flex-col'>
                <div className='max-h-10 bg-green-200 p-1'>
                    <h1><b>{authName} is Chatting with Receiver = {chatReceiver}</b></h1>
                </div>
                {/* overflow-scroll */}
                <div className='msgs-container h-4/5 overflow-y-auto scrollbar-thin noarrows scrollbar-thumb-red-500 scrollbar-track-gray-100'>
                    {  
                        chatMsgs.map((msg, index) => (
                            <div key={index} className={`p-1 m-5 ${msg.sender === authName ? 'text-right' : 'text-left'}`}>
                                <span className={`p-3 rounded-lg ${msg.sender === authName ? 'bg-blue-200' : 'bg-red-200'}`} >
                                    {msg.text}
                                </span>
                            </div>
                        ))
                    }
                </div>

                <div className='h-1/6 flex items-end justify-center'>
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


