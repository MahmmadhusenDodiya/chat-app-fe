import { create } from 'zustand';

// export const useChatMsgsStore = create((set) => ({
//    chatMsgs: [],
//    updateChatMsgs: (chatMsgs) => {
//       // console.log("chat messages state updateed to " + chatMsgs);
//       set({ chatMsgs });
//       // console.log("Final State after updating is ="+chatMsgs);
//    }
// }));


export const useChatMsgsStore = create((set, get) => ({
   chatMsgs: [],
   updateChatMsgs: (newChatMsgs) => {
      console.log("Chat messages state will be updated to:", newChatMsgs);
      set(state => {
         const updatedChatMsgs = [...state.chatMsgs, ...newChatMsgs];
         console.log("Final State after updating is:", updatedChatMsgs);
         return { chatMsgs: updatedChatMsgs };
      });
   }
}));
