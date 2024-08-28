<template>
  <div :class="['flex mb-4', isUser ? 'justify-end' : 'justify-start']">
    <div :class="['max-w-[70%] p-3 rounded-lg', isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800']">
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
      required: true,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
};
</script>