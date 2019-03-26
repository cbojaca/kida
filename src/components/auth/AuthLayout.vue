<template>
  <v-container class="auth_layout ma-0 pa-0" row fluid fill-height grid-list-xl text-xs-center>
    <v-layout row wrap align-center>
      <v-flex :xs6="$vuetify.breakpoint.mdAndUp" :x12="$vuetify.breakpoint.smAndDown">
        <router-view/>
      </v-flex>
      <v-flex align-center justify-center x6 class="auth_rightside ma-0 pa-0 hidden-sm-and-down">
        <div class="auth_inner_line"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AuthLayout"
};
</script>

<style lang="scss">
.auth_layout {
  background-color: white;
  
  .auth_rightside {
    position: relative;
    background-color: #333;
    overflow: hidden;
    height: 100%;
    background-color: #333;
  }

  .auth_inner_line {
    z-index: 1;
    top: -7%;
    position: absolute;
    background-color: #282828;
    left: 37.5%;
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
    width: 27%;
    height: 125%;
  }
}
</style>
