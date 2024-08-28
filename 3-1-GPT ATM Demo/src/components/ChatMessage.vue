<template>
  <div :class="['flex my-4 mx-3', isUser ? 'justify-end' : 'justify-start']">
    <div :class="['max-w-[70%] p-3 rounded-lg', isUser ? 'bg-[#24a09a] text-white' : 'bg-gray-200 text-gray-800']">
      {{ message }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChatMessage",
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
