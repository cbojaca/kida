<template>
  <v-container>
    <v-layout align-start justify-end row fill-height>
      <v-flex x2 offset-xs10>
        <add-user btn-title="Add User" btn-size="large"></add-user>
      </v-flex>
    </v-layout>
    <v-layout align-start row fill-height>
      <v-flex xs12 sm3 order-md3 order-sm2 pa-2 v-for="user in filteredUsers" :key="user.UserId">
        <v-hover>
          <v-card class="black--text">
            <v-layout>
              <v-flex xs4>
                <v-layout column align-center justify-center>
                  <v-avatar size="80" class="my-3" :color="colorGenerator()">
                    <span
                      v-if="!user.ImageUrl"
                      class="white--text headline"
                    >{{user.FullName | userInitials}}</span>
                    <img
                      v-if="user.ImageUrl"
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
                </v-layout>
              </v-flex>
              <v-flex xs8>
                <v-card-title primary-title>
                  <div>
                    <div class="title font-weight-regular">{{user.FullName}}</div>
                    <div class="body-2">{{user.Role}}</div>
                    <div></div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn flat icon color="red" v-on="on">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Delete User</v-card-title>
                  <v-card-text>Are you sure you want to delete {{user.FullName}}? </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round outline color="blue darken-1" flat @click="deleteUserFromApp(user.key)">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
            <!--  -->
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddUser from "./AddUser";

export default {
  components: {
    AddUser
  },
  data: () => ({    
    dialog: false    
  }),
  computed: {
    ...mapState("daycares", ["currentDaycare"]),
    ...mapState("account", ["currentUser"]),
    // Filtrar usuarios excepto el propio
    filteredUsers: function() {
      var self = this;
      var result = [];
      if (this.currentDaycare.users) {
        for (var key in this.currentDaycare.users) {
          if (
            this.currentDaycare.users.hasOwnProperty(key) &&
            self.currentUser.uid != [key]
          ) {
            result.push({key: key, ...this.currentDaycare.users[key]});
          }
        }
      }
      return result;
    }
  },
  filters: {
    userInitials: function(value) {
      return value ? value.substring(0, 2).toUpperCase() : "";
    }
  },
  methods: {
    ...mapActions("users", ["deleteUser"]),
    colorGenerator() {
      return this.$randomColor();
    },
    deleteUserFromApp(userKey) {
      this.deleteUser(userKey);
    }
  }
};
</script>

<style>
</style>
