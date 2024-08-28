<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 settings-panel" @click.self="$emit('close')">
    <div class="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">設定</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="mb-4">
        <label class="block mb-2">使用者名稱</label>
        <input v-model="settings.username" class="w-full p-2 border rounded" placeholder="輸入使用者名稱" @change="saveSettings" />
      </div>
      <div class="mb-4">
        <label class="block mb-2">API 設定</label>
        <select v-model="selectedAPI" class="w-full p-2 border rounded mb-2" @change="loadAPIKey">
          <option value="ChatGPT">ChatGPT</option>
          <option value="Gemini">Gemini</option>
          <option value="Claude">Claude</option>
          <option value="Qwen">Tongyi Qianwen</option>
        </select>
        <input v-model="apiKey" class="w-full p-2 border rounded" :placeholder="`輸入 ${selectedAPI} API Key`" @change="saveAPIKey" />
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, watch } from "vue";

  export default {
    name: "SettingsPanel",
    props: {
      isOpen: Boolean,
    },
    emits: ["close"],
    setup() {
      const settings = ref({
        username: "",
        userIcon: "",
      });
      const selectedAPI = ref("ChatGPT");
      const apiKey = ref("");

      const loadSettings = async () => {
        try {
          const response = await fetch("/api/settings");
          const data = await response.json();
          settings.value = data;
        } catch (error) {
          console.error("Failed to load settings:", error);
        }
      };

      const saveSettings = async () => {
        try {
          await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings.value),
          });
        } catch (error) {
          console.error("Failed to save settings:", error);
        }
      };

      const loadAPIKey = async () => {
        try {
          const response = await fetch(`/api/apikey/${selectedAPI.value}`);
          const data = await response.json();
          apiKey.value = data.apiKey;
        } catch (error) {
          console.error("Failed to load API key:", error);
        }
      };

      const saveAPIKey = async () => {
        try {
          await fetch(`/api/apikey/${selectedAPI.value}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: apiKey.value }),
          });
        } catch (error) {
          console.error("Failed to save API key:", error);
        }
      };

      onMounted(() => {
        loadSettings();
        loadAPIKey();
      });

      watch(selectedAPI, () => {
        loadAPIKey();
      });

      return {
        settings,
        selectedAPI,
        apiKey,
        saveSettings,
        saveAPIKey,
      };
    },
  };
</script>
