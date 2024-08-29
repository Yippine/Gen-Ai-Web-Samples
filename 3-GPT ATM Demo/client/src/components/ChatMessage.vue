<template>
  <div :class="['flex flex-col my-4 mx-3', isUser ? 'items-end' : 'items-start']">
    <div :class="['flex items-center mb-2', isUser ? 'flex-row-reverse' : 'flex-row']">
      <div
        :class="[
          'w-8 h-8 p-[1.36rem] rounded-full flex items-center justify-center',
          isUser ? 'bg-[#24a09a]' : 'bg-gray-300'
        ]"
      >
        <i :class="['fas', isUser ? 'fa-user' : 'fa-robot']"></i>
      </div>
      <span :class="['mx-2', isUser ? 'text-right' : 'text-left']">{{
        isUser ? userName : botName
      }}</span>
    </div>
    <div
      :class="[
        'max-w-[70%] p-3 rounded-lg break-words',
        isUser ? 'bg-[#24a09a] text-white' : 'bg-gray-200 text-gray-800'
      ]"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    isUser: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: 'User'
    },
    botName: {
      type: String,
      default: 'GPT ATM'
    }
  }
}
</script>

<style scoped>
.break-words {
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
