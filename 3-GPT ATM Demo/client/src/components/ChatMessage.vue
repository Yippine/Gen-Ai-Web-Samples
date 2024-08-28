<template>
  <div :class="['flex my-4 mx-3', isUser ? 'justify-end' : 'justify-start']">
    <div v-if="!isUser" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 p-5">
      <i class="fas fa-robot"></i>
    </div>
    <div :class="['max-w-[70%] p-3 rounded-lg break-words', isUser ? 'bg-[#24a09a] text-white' : 'bg-gray-200 text-gray-800']">
      {{ message }}
    </div>
    <div v-if="isUser" class="w-8 h-8 rounded-full bg-[#24a09a] flex items-center justify-center ml-2 p-5">
      <i class="fas fa-user"></i>
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
