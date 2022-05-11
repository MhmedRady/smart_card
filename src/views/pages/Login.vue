<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="10">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CAlert
                    v-for="error in loginErrors"
                    :key="error"
                    color="danger"
                    variant="solid"
                    class="fw-bold"
                    v-text="error"
                  ></CAlert>
                  <label class="form-label" for="email">Email Or Phone</label>
                  <CInputGroup class="mb-2">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      id="email"
                      label="Email"
                      placeholder="User Email Or Phone"
                      autocomplete="username"
                      v-model="state.email"
                    />
                  </CInputGroup>
                  <small
                    id="invalid-email"
                    class="invalid-feedback d-block mb-1"
                    v-if="v$.email.$error"
                  >
                    {{ v$.email.$errors[0].$message }}
                  </small>
                  <label class="form-label" for="password">Password</label>
                  <CInputGroup class="mb-2">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <!-- <CCol md="4"> -->
                    <CFormInput
                      id="password"
                      label="password"
                      placeholder="***********"
                      v-model="state.password"
                      type="password"
                    />
                    <!-- </CCol> -->
                  </CInputGroup>
                  <small
                    id="invalid-password"
                    class="invalid-feedback d-block mb-1"
                    v-if="v$.password.$error"
                  >
                    {{ v$.password.$errors[0].$message }}
                  </small>
                  <CRow>
                    <CCol :xs="6">
                      <CLoadingButton
                        color="primary"
                        :timeout="2000"
                        class="px-4"
                        @click="userLogin()"
                        >Submit
                      </CLoadingButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton
                    color="light"
                    variant="outline"
                    class="mt-3"
                    :loading="loading"
                  >
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
// import axios from 'axios'

export default {
  name: 'Login',
  setup() {
    const state = reactive({
      email: '',
      password: '',
    })
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required, minLength: minLength(8) },
      }
    })
    const v$ = useValidate(rules, state)
    return {
      state,
      v$,
    }
  },
  data() {
    return {
      loginErrors: [],
    }
  },
  mounted() {
    this.pageTitle('User Login ')
    // this.authTitle('authTitle')
  },
  methods: {
    // pageTitle: (title) => (document.title = title),
    async userLogin() {
      this.v$.$validate()
      if (this.v$.$error) {
        this.v$.$errors.forEach((err) => {
          if (err.$propertyPath == 'email') {
            if (err.$validator == 'required') {
              err.$message = 'User Email Is Required.!'
            }
          }
          if (err.$propertyPath == 'password') {
            if (err.$validator == 'required') {
              err.$message = 'User Password Is Required.!'
            }
          }
        })
      } else {
        const params = {
          email: this.state.email,
          password: this.state.password,
        }
        console.log(params)
        // await axios
        //   .get('http://localhost:3000/users', params)
        //   .then((response) => {
        //     this.loginErrors = []
        //     if (response.data.length > 0) {
        //       localStorage.setItem('auth-user', JSON.stringify(response.data))
        //       window.location.reload()
        //     } else {
        //       this.loginErrors.push('Your Email Or Password is not Correct!.')
        //     }
        //   })
        //   .finally(() => {
        //     // this.redirectPage({name:'home'});
        //   })
        //   .catch((e) => {
        //     console.log(e)
        //   })
      }
    },
  },
}
</script>
