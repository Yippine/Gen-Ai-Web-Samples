<template>
  <div class="max-w-md mx-auto my-8 p-4 rounded-lg shadow-lg relative">
    <button
      @click="toggleSettings"
      class="absolute left-4 top-4 text-gray-600 hover:text-gray-800 text-2xl"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div class="flex items-center justify-center mb-4">
      <img src="/favicon.ico" alt="Logo" class="w-8 h-8 mr-2" />
      <h1 class="text-2xl font-bold text-center">GPT ATM Demo</h1>
    </div>

    <div
      ref="chatContainer"
      class="h-[calc(100vh-210px)] overflow-y-auto mb-4 bg-white p-2 rounded relative"
    >
      <div
        class="absolute right-0 top-0 bottom-0 w-2 transition-opacity duration-300 opacity-0 hover:opacity-100"
      >
        <div class="h-full w-full overflow-y-scroll">
          <div class="w-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :message="msg.text"
        :isUser="msg.isUser"
        :userName="userName"
        :botName="botName"
      />
    </div>

    <div class="flex items-center relative">
      <textarea
        v-model="inputText"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.shift.exact="newline"
        placeholder="輸入訊息..."
        class="flex-grow mr-2 p-3 rounded-lg bg-gray-100 pr-12 pl-4 resize-none overflow-y-auto"
        :style="{ height: textareaHeight }"
        @input="adjustTextareaHeight"
        ref="messageInput"
        rows="1"
        :disabled="isWaitingResponse"
      ></textarea>

      <button
        @click="toggleRecording"
        class="absolute right-[3.75rem] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
        :disabled="isWaitingResponse"
      >
        <i :class="['fas', isRecording ? 'fa-microphone-slash' : 'fa-microphone']"></i>
      </button>
      <button
        @click="sendMessage"
        class="w-12 h-12 p-2 bg-[#24a09a] text-white rounded-full flex items-center justify-center hover:bg-[#1c847f] transition-colors duration-200 mx-auto"
        :disabled="isWaitingResponse"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

    <button
      v-show="showScrollButton"
      @click="scrollToBottom"
      class="fixed bottom-4 right-4 bg-white rounded-full p-2 shadow-md"
    >
      <i class="fas fa-chevron-down"></i>
    </button>

    <SettingsPanel
      v-if="isSettingsOpen"
      @close="toggleSettings"
      @settingsUpdated="handleSettingsUpdated"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ChatMessage from './components/ChatMessage.vue'
import SettingsPanel from './components/SettingsPanel.vue'

const MAX_ROWS = 5
const LINE_HEIGHT = 48

export default {
  name: 'App',
  components: {
    ChatMessage,
    SettingsPanel
  },
  setup() {
    const messages = ref([])
    const inputText = ref('')
    const isRecording = ref(false)
    const chatContainer = ref(null)
    const showScrollButton = ref(false)
    const isSettingsOpen = ref(false)
    const textareaHeight = ref('auto')
    const textareaRef = ref(null)
    const messageInput = ref(null)
    const isWaitingResponse = ref(false)
    const userName = ref('User')
    const botName = ref('GPT ATM')

    const sendMessage = () => {
      if (inputText.value.trim() && !isWaitingResponse.value) {
        const userMessage = inputText.value.trim()
        messages.value.push({ text: userMessage, isUser: true })
        inputText.value = ''
        resetTextareaHeight()
        scrollToBottom()

        isWaitingResponse.value = true

        // 模擬 API 呼叫
        setTimeout(() => {
          messages.value.push({ text: `Echo：${userMessage}`, isUser: false })
          scrollToBottom()
          isWaitingResponse.value = false
          nextTick(() => {
            if (messageInput.value) {
              messageInput.value.focus()
            }
          })
        }, 1000)
      }
    }

    const toggleRecording = () => {
      isRecording.value = !isRecording.value
    }

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
      })
    }

    const checkScroll = () => {
      if (chatContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer.value
        showScrollButton.value = scrollTop + clientHeight < scrollHeight - 50
      }
    }

    const toggleSettings = () => {
      isSettingsOpen.value = !isSettingsOpen.value
    }

    const adjustTextareaHeight = () => {
      const textarea = messageInput.value
      if (!textarea) return

      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, MAX_ROWS * LINE_HEIGHT)
      textarea.style.height = `${newHeight}px`
      textareaHeight.value = `${newHeight}px`
    }

    const resetTextareaHeight = () => {
      const textarea = messageInput.value
      if (!textarea) return

      textarea.style.height = `${LINE_HEIGHT}px`
      textareaHeight.value = `${LINE_HEIGHT}px`
    }

    const newline = (event) => {
      const textarea = event.target
      const cursorPosition = textarea.selectionStart
      const textBeforeCursor = textarea.value.substring(0, cursorPosition)
      const textAfterCursor = textarea.value.substring(cursorPosition)

      if (textarea.value.split('\n').length < MAX_ROWS) {
        textarea.value = textBeforeCursor + '\n' + textAfterCursor
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1
        adjustTextareaHeight()
      }
      event.preventDefault()
    }

    const handleOutsideClick = (event) => {
      if (
        isSettingsOpen.value &&
        !event.target.closest('.settings-panel') &&
        !event.target.closest('.fa-bars')
      ) {
        isSettingsOpen.value = false
      }
    }

    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const data = await response.json()
        userName.value = data.userName || 'User'
        botName.value = data.botName || 'GPT ATM'
      } catch (error) {
        console.error('Failed to load userName:', error)
        userName.value = 'User'
        botName.value = 'GPT ATM'
      }
    }

    const handleSettingsUpdated = (newSettings) => {
      userName.value = newSettings.userName || 'User'
      botName.value = newSettings.botName || 'GPT ATM'
    }

    onMounted(() => {
      document.addEventListener('click', handleOutsideClick)
      if (chatContainer.value) {
        chatContainer.value.addEventListener('scroll', checkScroll)
      }
      textareaRef.value = document.querySelector('textarea')
      loadSettings()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleOutsideClick)
      if (chatContainer.value) {
        chatContainer.value.removeEventListener('scroll', checkScroll)
      }
    })

    watch(messages, () => {
      scrollToBottom()
    })

    watch(inputText, (newValue) => {
      if (newValue) {
        adjustTextareaHeight()
      } else {
        resetTextareaHeight()
      }
    })

    return {
      messages,
      inputText,
      isRecording,
      chatContainer,
      showScrollButton,
      isSettingsOpen,
      textareaHeight,
      sendMessage,
      toggleRecording,
      scrollToBottom,
      toggleSettings,
      adjustTextareaHeight,
      newline,
      messageInput,
      isWaitingResponse,
      userName,
      botName,
      handleSettingsUpdated
    }
  }
}
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

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
  border: transparent;
}
</style>
