<template>
  <div :class="['flex flex-col my-4 mx-3', isUser ? 'items-end' : 'items-start']">
    <div :class="['flex items-center mb-2', isUser ? 'flex-row-reverse' : 'flex-row']">
      <div
        :class="[
          'w-8 h-8 rounded-full flex items-center justify-center',
          isUser ? 'bg-[#24a09a]' : 'bg-gray-300'
        ]"
      >
        <i :class="['fas', isUser ? 'fa-user' : 'fa-robot']"></i>
      </div>
      <span :class="['mx-2', isUser ? 'text-right' : 'text-left']">{{
        isUser ? username : 'ATM'
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
    username: {
      type: String,
      default: 'User'
    }
  }
}
</script>
