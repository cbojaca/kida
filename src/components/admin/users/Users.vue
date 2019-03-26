<template>
  <v-container>
    <v-layout align-start justify-end row fill-height>
      <v-flex x2 offset-xs10>
        <add-user btn-title="Add User" btn-size="large"></add-user>
      </v-flex>
    </v-layout>
    <v-layout align-start row fill-height>
      <v-flex xs12 sm3 order-md3 order-sm2 pa-2>
        <v-hover>
          <v-card class="black--text" slot-scope="{ hover }" :class="`elevation-${hover ? 4 : 2}`">
            <v-layout>
              <v-flex xs4>
                <v-layout column align-center justify-center>
                  <v-avatar size="80" class="my-3">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-avatar>
                </v-layout>
              </v-flex>
              <v-flex xs8>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Supermodel</div>
                    <div>Foster the People</div>
                    <div>(2014)</div>
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
import AddUser from './AddUser'
export default {
  components: {
    AddUser
  }
};
</script>

<style>
</style>
