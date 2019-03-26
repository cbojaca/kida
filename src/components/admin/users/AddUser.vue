<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        round
        color="primary"
        :large="btnSize === 'large'"
        :small="btnSize === 'small'"
        outline
        dark
      >
        {{btnTitle}}
        <v-icon right dark>{{btnIcon}}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">New User</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Email*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-chip color="teal" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>Teacher
              </v-chip>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-chip color="teal" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>Parent
              </v-chip>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-chip color="teal" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>Admin
              </v-chip>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addUser",
  data: () => ({
    dialog: false
  }),
  props: {
    btnTitle: {
      type: String,
      default: "Add User"
    },
    btnIcon: {
      type: String,
      default: "add"
    },
    btnSize: {
      type: String,
      default: "large"
    }
  }
};
</script>

<style>
</style>
