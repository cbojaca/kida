<template>
  <div>
    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      app
    >
      <v-list>
        <v-list-tile avatar :to="{name: 'userprofile'}">
          <v-list-tile-avatar color="teal">
            <span
              v-if="!userProfile.ImageUrl"
              class="white--text headline"
            >{{userProfile.FullName.substring(0,2).toUpperCase()}}</span>
            <img
              v-if="userProfile.ImageUrl"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{userProfile.FullName}}</v-list-tile-title>
            <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile :to="{name: 'dashboard'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'users'}">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

       <v-divider></v-divider>
      <v-list>
        <v-list-tile @click="SignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>LogOut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar
      app
      :fixed="toolbar.fixed"
      dark
      class="app_toolbar"
      color="primary"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Welcome {{userProfile.FullName}} {{userProfile.Role}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn mr-5 icon>
        <v-icon medium>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import router from "../../router/router";
const fb = require("../../firebaseConfig.js");

export default {
  name: "app-layout",
  data: () => ({
    drawer: {
      // sets the open status of the drawer
      open: true,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: true,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: false,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: true,
      // sets the drawer to the mini variant, showing only icons, of itself (true)
      // or showing the full drawer (false)
      mini: false
    },
    toolbar: {
      //
      fixed: true,
      // sets if the toolbar contents is leaving space for drawer (false) or not (true)
      clippedLeft: true
    },
    footer: {
      // sets the CSS position of the footer
      fixed: true,
      // sets if the footer is full width (true) or gives space to the drawer (false)
      clippedLeft: true
    }
  }),
  props: {
    source: String
  },
  created() {
    this.loadUser();
  },
  computed: {
    ...mapState("account", ["userProfile"])
  },
  methods: {
    ...mapMutations("account", ["setCurrentUser"]),
    ...mapActions("account", ["logout", "fetchUserProfile"]),
    SignOut() {
      this.logout({ router });
    },
    // fetch the user data from the firebase DB in every reload
    loadUser() {
      fb.auth.onAuthStateChanged(user => {
        if (user) {
          this.setCurrentUser(user);
          this.fetchUserProfile();
        }
      });
    },
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.drawer.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.drawer.mini = !this.drawer.mini;
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer() {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open;
      }
    }
  }
};
</script>

<style lang="scss">
.app_toolbar .app_toolbar_avatar {
  cursor: pointer;
}
</style>
