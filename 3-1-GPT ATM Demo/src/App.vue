<template>
  <div class="max-w-md mx-auto my-8 p-4 rounded-lg shadow-lg h-[750px]">
    <div class="flex items-center justify-center mb-4">
      <img src="/favicon.ico" alt="Logo" class="w-8 h-8 mr-2" />
      <h1 class="text-2xl font-bold text-center">GPT ATM Demo</h1>
    </div>

    <div class="h-[607px] overflow-y-auto mb-4 bg-white p-2 rounded relative">
      <div class="absolute right-0 top-0 bottom-0 w-2 transition-opacity duration-300 opacity-0 hover:opacity-100">
        <div class="h-full w-full overflow-y-scroll">
          <div class="w-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg.text" :isUser="msg.isUser" />
    </div>

    <div class="flex items-center mb-4 relative">
      <input v-model="inputText" @keyup.enter="sendMessage" placeholder="輸入訊息..." class="flex-grow mr-2 p-3 rounded-full bg-gray-100 pr-12 pl-4" />
      <button @click="toggleRecording" class="absolute right-[3.75rem] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
        <i :class="['fas', isRecording ? 'fa-microphone-slash' : 'fa-microphone']"></i>
      </button>
      <button @click="sendMessage" class="w-12 h-12 p-2 bg-[#24a09a] text-white rounded-full flex items-center justify-center hover:bg-[#1c847f] transition-colors duration-200 mx-auto">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import ChatMessage from "./components/ChatMessage.vue";

  export default {
    name: "App",
    components: {
      ChatMessage,
    },
    setup() {
      const messages = ref([]);
      const inputText = ref("");
      const isRecording = ref(false);

      const sendMessage = () => {
        if (inputText.value.trim()) {
          messages.value.push({ text: inputText.value, isUser: true });
          inputText.value = "";
          // Here you would typically call your API to get a response
          // For demo purposes, we'll just echo the message
          setTimeout(() => {
            messages.value.push({ text: `Echo: ${inputText.value}`, isUser: false });
          }, 1000);
        }
      };

      const toggleRecording = () => {
        isRecording.value = !isRecording.value;
      };

      return {
        messages,
        inputText,
        isRecording,
        sendMessage,
        toggleRecording,
      };
    },
  };
</script>

<style scoped>
  /* Custom scrollbar styles */
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
    border: transparent;
  }
</style>
