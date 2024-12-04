<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>

        <q-toolbar-title>
          Spring financial Leaderboard
        </q-toolbar-title>

      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})


</script>
