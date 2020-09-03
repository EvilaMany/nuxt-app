<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-form ref="form" v-model="isValidForm">
            <v-card-text>
              <v-text-field
                :rules="validate.email"
                label="Email" name="email"
                v-model="form.email"
                required
              />
              <v-text-field
                :type="'password'"
                :rules="validate.password"
                v-model="form.password"
                label="password"
              />
              <v-card-actions>
                <v-btn @click="$refs.form.validate() && login()" primary large.block> Send Request </v-btn>
              </v-card-actions>
              <p v-for="error in formErrors">{{ error }}</p>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import VuetifyLogo from '~/components/VuetifyLogo.vue'

    export default {
        components: {
            Logo,
            VuetifyLogo
        },
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                isValidForm: null,
                formErrors: [],

                validate: {
                    email: [
                        (email) => !!email || 'Required'
                    ],
                    password: [
                        (password) => !!password || 'Required'
                    ]
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('auth/login', this.form)
                    .then((data) => {
                        this.$router.push('/')
                    })
                    .catch((response) => {
                        this.formErrors = response.errors
                    })
            },
            register() {

            }
        }
    }
</script>
