<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" v-if="user">
        <v-card>
          <v-card-title>Profile</v-card-title>
          <v-card-text>
            <p>
              Name: <span> {{ user.name }} </span>
            </p>
            <p>
              Email: <span> {{ user.email }} </span>
            </p>
            <v-card-actions>
              <v-btn @click="logout" primary large.block> Logout </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  middleware: 'authenticated',
  computed: {
    ...mapGetters('auth', ['token', 'user'])
  },
  methods: {
    logout() {
      this.$store.commit('auth/LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>
