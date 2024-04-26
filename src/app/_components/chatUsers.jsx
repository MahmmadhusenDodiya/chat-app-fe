import React from 'react'
import { useUserStore } from '../zustand/useUsersStore'

const ChatUser = () => {
    const {users}=useUserStore();
    
    return (
        <div>

            {users.map((user, index) => (
                <div>
                    {user.username}
                </div>
            ))}

        </div>
    )
}
export default ChatUser;