<template>
  <div class="mb-4 p-4 bg-gray-100 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">快速交易</h3>
    <div class="flex space-x-2">
      <button @click="$emit('transaction', '取款', 3000)" class="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600">
        取款 3000 元
      </button>
      <button @click="$emit('transaction', '轉帳', 5000)" class="flex-1 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        轉帳 5000 元
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickTransactions',
  emits: ['transaction'],
};
</script>