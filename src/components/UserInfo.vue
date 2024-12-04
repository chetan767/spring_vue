<template>

  <q-card class="" style="width: 400px">
    <q-card-section>
      <div class="text-h6">User Information</div>
    </q-card-section>

    <q-card-section v-if="selectedUser">

      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>
          <q-item-section>{{ selectedUser.name }}</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="stars" />
          </q-item-section>
          <q-item-section>{{ selectedUser.points }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="cake" />
          </q-item-section>
          <q-item-section>{{ selectedUser.age }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>
          <q-item-section>{{ selectedUser.address }}</q-item-section>
        </q-item>

      </q-list>
      <div class="row q-mt-lg justify-center">
        <div class="col-10"></div>
        <q-img style=" max-width: 150px" :src="`${getApiBaseUrl()}/uploads/${selectedUser._id}.png`" />

      </div>
    </q-card-section>

    <q-card-actions align="right" class="">
      <q-btn flat label="Close" v-close-popup color="primary" />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { getApiBaseUrl } from 'src/constants/flavour';

defineProps({
  selectedUser: {
    type: Object,
    required: true
  }
});

defineOptions({
  name: 'UserInfo'
});
</script>

<style scoped></style>
