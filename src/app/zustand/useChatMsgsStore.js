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
      console.log("this new message will be appended to array ", newChatMsgs);
      set(state => {
         const updatedChatMsgs = [...state.chatMsgs, ...newChatMsgs];
         console.log("Final State after updating is:", updatedChatMsgs);
         return { chatMsgs: updatedChatMsgs };
      });
   },
   CreateChatMessages: (newChatMsgs) => {
      console.log("Entire New Store created ---------------");
      set(state => {
         console.log("create entire new messages in zustand");
         console.log("Final State after updating is:", newChatMsgs);
         return { chatMsgs: newChatMsgs };
      });
   }
   
}));
