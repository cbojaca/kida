<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 2}`" class="mx-auto" width="500px">
      <v-card-title>
        <v-form class="login">
          <h2>Welcome</h2>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
        <span class="login_error caption" v-if="alert.message">{{alert.message}}</span>
      </v-card-title>
      <v-card-actions class="justify-center login-actions">
        <v-btn round large color="info" :disabled="isLoginDisable" @click="handleSubmit">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../../../router/router";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapState({ alert: state => state.alert }),
    isLoginDisable() {
      return !this.email || !this.password;
    }
  },
  created() {
    this.clearAlert();
  },
  methods: {
    ...mapActions("account", ["login"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    handleSubmit() {
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password, router });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  margin: 20px;
}

.login-actions [type="button"] {
  margin: 0 0 20px 0;
}

.login_error {
  margin-left: 20px;
  text-align: -webkit-left;
  color: red;
}
</style>
