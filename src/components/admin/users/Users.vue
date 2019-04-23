<template>
  <v-container>
    <v-layout align-start justify-end row fill-height>
      <v-flex x2 offset-xs10>
        <add-user btn-title="Add User" btn-size="large"></add-user>
      </v-flex>
    </v-layout>
    <v-layout align-start row fill-height>
      <v-flex xs12 sm3 order-md3 order-sm2 pa-2 v-for="user in filteredUsers" :key="user.USerId">
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
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AddUser from "./AddUser";

export default {
  components: {
    AddUser
  },
  computed: {
    ...mapState("daycares", ["currentDaycare"]),
    ...mapState("account", ["currentUser"]),
    // Filtrar usuarios excepto el propio
    filteredUsers: function() {
      var self = this;
      var result = [];
      if (this.currentDaycare.users) {
        for (var key in this.currentDaycare.users) {
          if ( this.currentDaycare.users.hasOwnProperty(key) && self.currentUser.uid != [key]) {
            result.push(this.currentDaycare.users[key]);
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
    colorGenerator() {
      return this.$randomColor();
    }
  }
};
</script>

<style>
</style>
