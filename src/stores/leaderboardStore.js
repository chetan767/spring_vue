import { data } from "autoprefixer";
import { defineStore } from "pinia";
import {
  springDeleteAPI,
  springGetAPI,
  springPatchAPI,
  springPostAPI,
} from "src/services/apiService";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => ({
    users: [],
  }),
  getters: {
    // users: (state) => state.users,
  },
  actions: {
    async getUsersFromServer(name = "") {
      let path = "users";
      if (name.length > 0) {
        path = path + "?search=" + name;
      }
      let res = await springGetAPI(path);
      this.users = res;
    },
    async addUser(data) {
      let res = await springPostAPI("users", data);
      if (!("error" in res)) {
        this.users.push(res);
      }
    },
    async deleteUser(userId) {
      let res = await springDeleteAPI(`users/${userId}`);
      if (!("error" in res)) {
        const index = this.users.findIndex((u) => u._id === userId);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      }
    },
    async updatePoints(userId, pointsChange) {
      let foundItem = this.users.find((e) => e._id == userId);
      if (foundItem) {
        foundItem.points = foundItem.points + pointsChange;
      }
      let res = await springPatchAPI(`users/${userId}/points`, {
        points_change: pointsChange,
      });
      if ("error" in res) {
        foundItem.points = foundItem.points - pointsChange;
      }
    },
  },
});
