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

    function changeColor(element) {
        console.log("OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");

        // Reset background color of all divs
        var divs = document.getElementsByClassName('color-box');
        for (var i = 0; i < divs.length; i++) {
          divs[i].classList.remove('bg-yellow-500');
          divs[i].classList.add('bg-blue-500');
        }
        
        // Change background color of clicked div
        element.classList.remove('bg-blue-500');
        element.classList.add('bg-yellow-500');
      }

    useEffect(() => {
        const getMsgs = async () => {
            console.log('getting msgs load msgs from backed : ');

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

                
                    console.log("getting data"+res.data);
                
                if (res.data.length !== 0) {
                    updateChatMsgs(res.data);
                } else {
                    updateChatMsgs([]);
                }
            } catch (error) {
                console.log("this is error "+error);
            }
        }
        if (chatReceiver) {
            getMsgs();
        }
    }, [chatReceiver])




    return (
        <div>

            {users.map((user, index) => (
                <div onClick={() =>{ setChatReceiver(user);
                    changeColor(this); }}  className="color-box hover:cursor-pointer bg-green-200 rounded-xl m-3 p-5">
                    {(index)+"."+user.username}
                </div>
            ))}

        </div>
    )
}
export default ChatUser;