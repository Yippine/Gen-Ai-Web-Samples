<template>
  <button @click="showMore" class="w-full p-2 bg-gray-200 rounded hover:bg-gray-300">
    <i class="fas fa-plus mr-2"></i>
    更多功能
  </button>
</template>

<script>
export default {
  name: 'MoreFeatures',
  setup() {
    const showMore = () => {
      console.log("顯示更多功能");
      // Here you would implement the logic to show more features
    };

    return {
      showMore,
    };
  },
};
</script>