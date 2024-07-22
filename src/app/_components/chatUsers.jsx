'use client'
import React, { useState, useEffect } from 'react'
import { useUserStore } from '../zustand/useUsersStore'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore';
import { useAuthStore } from '../zustand/useAuthStore';

import axios from 'axios';

const ChatUser = () => {
    const { users } = useUserStore();
    const { chatReceiver, updateChatReceiver } = useChatReceiverStore();
    const { updateChatMsgs } = useChatMsgsStore();
    const { authName } = useAuthStore();

    const setChatReceiver = (user) => {
        updateChatReceiver(user.username);
    }

    // Get all divs with the class "color-box"
    const divs = document.querySelectorAll('.color-box');

    // console.log("length of divs "+divs.length);

    divs.forEach(div => {
        div.addEventListener('click', function () {
            // Reset background color of all divs
            divs.forEach(d => {
                d.classList.remove('bg-slate-300');
                d.classList.add('bg-green-300');
            });

            // Change background color of clicked div
            this.classList.remove('bg-green-300');
            this.classList.add('bg-slate-300');
        });
    });

    useEffect(() => {
        const getMsgs = async () => {
            console.log('getting msgs load msgs from Backend : ');

            try {
                const res = await axios.get('http://localhost:8080/msgs',
                    {
                        params: {
                            'sender': authName,
                            'receiver': chatReceiver
                        }
                    },
                    {
                        withCredentials: true
                    });


                console.log("getting data ===" + res.data);
                    console.log("type of this data="+Array.isArray(res.data));
                if (res.data.length !== 0) {
                    console.log("call 1---------------------------");
                    updateChatMsgs(res.data);
                } else {
                    console.log("call 2----------------------------");
                    updateChatMsgs([]);
                }
            } catch (error) {
                console.log("this is error " + error);
            }
        }
        if (chatReceiver) {
            getMsgs();
        }
    }, [chatReceiver])




    return (
        <div className='max-h-lvh overflow-y-auto scrollbar-thin noarrows scrollbar-thumb-red-500 scrollbar-track-gray-300 '>

            {users.map((user, index) => (
                user.username !== authName ? ( 
                    <div
                        key={index}
                        className="color-box text-xl hover:cursor-pointer bg-green-300 rounded-xl m-3 p-5"
                        onClick={() => setChatReceiver(user)} // Optimized onClick handler
                    >
                        {user.username}
                    </div>
                ) : null // Explicitly return null for unmatched users
            ))}


        </div>
    )
}
export default ChatUser;