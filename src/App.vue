<template>
  <div id="app">
    <h1>Real-Time Chat Application</h1>
    <div class="chat-window">
      <div class="messages">
        <Message v-for="(msg, index) in messages" :key="index" :message="msg" />
      </div>
      <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Type a message..." />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { sendMessage, listenForMessages } from "./firebase";
import Message from "./components/Message.vue";

export default {
  name: "App",
  components: {
    Message,
  },
  setup() {
    const messages = ref([]);
    const messageText = ref("");
    const userName = ref("User1"); // You can make this dynamic later.

    // Listen for new messages
    onMounted(() => {
      listenForMessages((newMessages) => {
        messages.value = newMessages;
      });
    });

    // Send a message
    const sendMessage = () => {
      if (messageText.value.trim()) {
        sendMessage(messageText.value, userName.value);
        messageText.value = "";
      }
    };

    return {
      messages,
      messageText,
      sendMessage,
    };
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
.chat-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.messages {
  max-height: 400px;
  overflow-y: auto;
  width: 300px;
  margin-bottom: 20px;
}
input {
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
