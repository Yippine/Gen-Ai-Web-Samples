<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 settings-panel"
    @click.self="$emit('close')"
  >
    <div
      class="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-lg p-4 transform transition-transform duration-300"
      :class="{ 'translate-x-0': true, '-translate-x-full': false }"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">設定</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">使用者名稱</label>
          <input
            v-model="settings.userName"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="輸入使用者名稱"
            @change="saveSettings"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">機器人名稱</label>
          <input
            v-model="settings.botName"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="輸入機器人名稱"
            @change="saveSettings"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">API 設定</label>
          <select
            v-model="selectedAPI"
            class="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            @change="loadAPIKey"
          >
            <option value="ChatGPT">ChatGPT</option>
            <option value="Gemini">Gemini</option>
            <option value="Claude">Claude</option>
            <option value="Qwen">Tongyi Qianwen</option>
          </select>
          <input
            v-model="apiKey"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            :placeholder="`輸入 ${selectedAPI} API Key`"
            @change="saveAPIKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'SettingsPanel',
  emits: ['close', 'settingsUpdated'],
  setup(props, { emit }) {
    const settings = ref({
      userName: '',
      botName: ''
    })
    const selectedAPI = ref('ChatGPT')
    const apiKey = ref('')

    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const data = await response.json()
        settings.value = data
        console.log(`data: ${data}`)
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }

    const saveSettings = async () => {
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings.value)
        })
        emit('settingsUpdated', settings.value)
      } catch (error) {
        console.error('Failed to save settings:', error)
      }
    }

    const loadAPIKey = async () => {
      try {
        const response = await fetch(`/api/apikey/${selectedAPI.value}`)
        const data = await response.json()
        apiKey.value = data.apiKey
      } catch (error) {
        console.error('Failed to load API key:', error)
      }
    }

    const saveAPIKey = async () => {
      try {
        await fetch(`/api/apikey/${selectedAPI.value}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: apiKey.value })
        })
      } catch (error) {
        console.error('Failed to save API key:', error)
      }
    }

    onMounted(() => {
      loadSettings()
      loadAPIKey()
    })

    watch(selectedAPI, () => {
      loadAPIKey()
    })

    return {
      settings,
      selectedAPI,
      apiKey,
      saveSettings,
      saveAPIKey
    }
  }
}
</script>
