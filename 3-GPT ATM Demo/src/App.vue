<template>
  <div class="max-w-md mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4 text-center">GPT ATM Demo</h1>
    
    <div class="h-96 overflow-y-auto mb-4 bg-gray-100 p-2 rounded">
      <ChatMessage 
        v-for="(msg, index) in messages" 
        :key="index" 
        :message="msg.text" 
        :isUser="msg.isUser" 
      />
    </div>
    
    <div class="flex items-center mb-4">
      <input 
        v-model="inputText"
        @keyup.enter="sendMessage"
        placeholder="輸入訊息..."
        class="flex-grow mr-2 p-2 border rounded"
      />
      <button @click="sendMessage" class="p-2 bg-blue-500 text-white rounded">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    
    <div class="flex justify-between mb-4">
      <button 
        @click="toggleRecording" 
        :class="['flex-1 mr-2 p-2 rounded', isRecording ? 'bg-red-500 text-white' : 'bg-gray-200']"
      >
        <i :class="['fas', isRecording ? 'fa-stop' : 'fa-microphone']"></i>
        {{ isRecording ? "停止錄音" : "開始錄音" }}
      </button>
      <button class="flex-1 ml-2 p-2 bg-gray-200 rounded">
        <i class="fas fa-headphones mr-2"></i>
        語音播放
      </button>
    </div>
    
    <QuickTransactions @transaction="handleQuickTransaction" />
    
    <MoreFeatures />
  </div>
</template>

<script>
import { ref } from 'vue';
import ChatMessage from './components/ChatMessage.vue';
import QuickTransactions from './components/QuickTransactions.vue';
import MoreFeatures from './components/MoreFeatures.vue';

export default {
  name: 'App',
  components: {
    ChatMessage,
    QuickTransactions,
    MoreFeatures,
  },
  setup() {
    const messages = ref([]);
    const inputText = ref('');
    const isRecording = ref(false);

    const sendMessage = () => {
      if (inputText.value.trim()) {
        messages.value.push({ text: inputText.value, isUser: true });
        inputText.value = '';
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

    const handleQuickTransaction = (type, amount) => {
      const message = `${type} ${amount} 元`;
      messages.value.push({ text: message, isUser: true });
      // Here you would typically process the transaction
      setTimeout(() => {
        messages.value.push({ text: `已處理：${message}`, isUser: false });
      }, 1000);
    };

    return {
      messages,
      inputText,
      isRecording,
      sendMessage,
      toggleRecording,
      handleQuickTransaction,
    };
  },
};
</script>