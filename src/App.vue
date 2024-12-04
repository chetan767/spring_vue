<template>
  <router-view />
</template>

<script setup>


import { useLeaderboardStore } from 'src/stores/leaderboardStore';
import { useQuasar } from 'quasar'
import { onMounted } from 'vue';


const leaderboardStore = useLeaderboardStore()
const $q = useQuasar()


onMounted(async () => {
  $q.loading.show({
  })
  await leaderboardStore.getUsersFromServer()
  $q.loading.hide()
});


defineOptions({
  name: 'App'
});
</script>
