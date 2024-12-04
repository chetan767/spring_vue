<template>
  <!-- Add User Dialog -->
  <q-dialog v-model="showAddUserDialog">
    <q-card style="min-width: 350px">

      <q-card-section>
        <div class="text-h6">Add New User</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="newUser.name" label="Name" :rules="[val => !!val || 'Name is required']" />
        <q-input v-model="newUser.age" label="Age" type="number" :rules="[val => !!val || 'Age is required']" />
        <q-input v-model="newUser.address" label="Address" :rules="[val => !!val || 'Address is required']" />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="saveNewUser"
          :disable="!newUser.name || !newUser.address || !newUser.age" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- User Info Dialog -->
  <q-dialog v-model="showUserInfoDialog" transition-show="jump-up" transition-hide="jump-down">
    <UserInfo :selectedUser="selectedUser" />
  </q-dialog>



  <!-- Delete Confirmation Dialog -->
  <q-dialog v-model="showDeleteDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm text-h6">Are you sure you want to delete this user?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Delete" color="negative" @click="confirmDeleteUser" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-10">
        <q-table title="Users" :rows="sortedUsers" :columns="columns" row-key="_id" :rows-per-page-options="[21]"
          card-class="card-light">
          <template v-slot:top-left>
            <div class="row ">
              <div class="col-12">
                <q-input outlined v-model="search" debounce="700" @update:model-value="searchUsers"
                  placeholder="Search by name">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>


            </div>

          </template>
          <template v-slot:top-right>

            <q-btn color="primary" label="Add New User" class="q-mt-sm q-mt-sm-none" @click="showAddUserDialog = true">
              <q-tooltip>Add a new user to the table</q-tooltip>
            </q-btn>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                <div class="cursor-pointer text-primary" @click="showUserInfo(props.row)">{{ props.row.name }}</div>
              </q-td>
              <q-td key="points" :props="props">
                {{ props.row.points }}
              </q-td>
              <q-td key="age" :props="props">
                {{ props.row.age }}
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn dense round flat color="positive" icon="add" @click="increasePoints(props.row)">
                  <q-tooltip>Increase points</q-tooltip>
                </q-btn>
                <q-btn dense round flat color="negative" icon="remove" @click="decreasePoints(props.row)">
                  <q-tooltip>Decrease points</q-tooltip>
                </q-btn>
                <q-btn dense round flat color="negative" icon="delete" @click="showDeleteConfirmation(props.row)">
                  <q-tooltip>Delete user</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

  </div>
</template>
<script setup>

import { useLeaderboardStore } from 'src/stores/leaderboardStore';
import { ref, computed } from 'vue';
import UserInfo from 'src/components/UserInfo.vue';
const leaderboardStore = useLeaderboardStore()

const search = ref('')
const showUserInfoDialog = ref(false)
const showAddUserDialog = ref(false)
const selectedUser = ref(null)
const newUser = ref({ name: '', address: '', age: null })
const showDeleteDialog = ref(false);
const userToDelete = ref(null);

const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'points', required: true, label: 'Points', align: 'center', field: 'points', sortable: true, sort: (a, b) => b - a },
  { name: 'age', required: true, label: 'Age', align: 'center', field: 'age' },
  { name: 'actions', required: true, label: 'Actions', align: 'right' },
]


// functions start

const increasePoints = (user) => {
  let points = user.points
  console.log(points);

  leaderboardStore.updatePoints(user._id, 1)


}

const decreasePoints = (user) => {
  if (user.points > 0) {
    leaderboardStore.updatePoints(user._id, - 1)
  }
}


const showUserInfo = (user) => {
  selectedUser.value = user
  showUserInfoDialog.value = true
}

const saveNewUser = () => {
  if (newUser.value.name && newUser.value.address && newUser.value.age) {
    leaderboardStore.addUser({
      "name": newUser.value.name,
      "age": parseInt(newUser.value.age),
      "address": newUser.value.address
    })
    showAddUserDialog.value = false
  }
}

const searchUsers = async (val) => {
  console.log(val);
  await leaderboardStore.getUsersFromServer(val)
}
const showDeleteConfirmation = (user) => {
  userToDelete.value = user;
  showDeleteDialog.value = true;
};


const confirmDeleteUser = () => {
  if (userToDelete.value) {
    leaderboardStore.deleteUser(userToDelete.value._id);
    userToDelete.value = null;
  }
};


// functions end

// computed
const sortedUsers = computed(() => {



  return leaderboardStore.users


    .slice()  // To avoid mutating the original array
    .sort((a, b) => {
      // Sort by points first (descending)
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // If points are equal, sort by name (ascending)
      return a.name.localeCompare(b.name);
    });
});

defineOptions({
  name: 'IndexPage'
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.card-light {
  background: var(--background-color-light) !important;

}

.pointer {
  cursor: pointer;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
