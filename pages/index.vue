<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" v-if="user">
        <v-card>
          <v-card-title>Profile</v-card-title>
          <v-card-text>
            <v-row justify="space-between">
              <div>
                <v-img
                  :src="user.avatar"
                  class="avatar"
                />
              </div>
              <div>
                <p>
                  Name: <span> {{ user.name }} </span>
                </p>
                <p>
                  Email: <span> {{ user.email }} </span>
                </p>
                <v-card-actions>
                  <v-btn @click="logout" primary large.block> Logout </v-btn>
                </v-card-actions>
              </div>
            </v-row>
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
<style lang="scss">
  .avatar {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 10px;
  }
</style>
