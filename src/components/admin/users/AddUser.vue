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
    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          <span class="headline">New User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="fullName" label="Full Name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="userRole"
                  :items="roles"
                  placeholder="Set Role"
                  label="Role"
                  chips
                  clearable
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round outline color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn
            round
            outline
            :disabled="!email || !password || !fullName || !userRole"
            color="blue darken-1"
            flat
            @click="createNewUser()"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "addUser",
  data: () => ({
    valid: false,
    dialog: false,
    roles: ["Admin", "Teacher", "Parent"],
    userRole: "",
    password: "",
    fullName: "",
    email: "",
    emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"]
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
  },
  methods: {
    ...mapActions("account", ["createUser"]),
    createNewUser() {
      const { email, password, fullName, userRole } = this;
      this.createUser({ email, password, fullName, userRole });
      this.dialog = false;
    }
  }
};
</script>