<template>
  <CModal backdrop="static" :visible="modalVisabil" @close="USER_MODAL(false)">
    <CModalHeader>
      <CModalTitle>Edit User</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div v-if="loading" class="overlay">
        <CButton disabled>
          <CSpinner component="span" size="sm" aria-hidden="true" />
          Loading...
        </CButton>
      </div>
      <CForm>
        <CLabel for="username" class="form-label">Username</CLabel>
        <CInputGroup class="mb-2">
          <CInputGroupText>
            <CIcon icon="cil-user" />
          </CInputGroupText>
          <CFormInput
            id="username"
            label="Username"
            placeholder="Username"
            autocomplete="userName"
            v-model="name"
          />
        </CInputGroup>
        <CLabel for="email" class="form-label">Email</CLabel>
        <CInputGroup class="mb-2">
          <CInputGroupText>
            <CIcon icon="cilEnvelopeClosed" />
          </CInputGroupText>
          <CFormInput
            id="email"
            label="Email Address"
            placeholder="User Email Or Phone"
            autocomplete="username"
            v-model="email"
          />
        </CInputGroup>
        <CLabel for="phone" class="form-label">Phone Number</CLabel>
        <CInputGroup class="mb-2">
          <CInputGroupText>
            <CIcon icon="cilScreenSmartphone" />
          </CInputGroupText>
          <CFormInput
            id="phone"
            label="Phone"
            placeholder="000-000-000"
            autocomplete="username"
            v-model="phone"
          />
        </CInputGroup>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="USER_MODAL(false)"> Close </CButton>
      <CButton color="primary" @click="saveUpdate()">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: 'UserModal',
  props: ['user'],
  data() {
    return {
      user_id: '',
      name: '',
      email: '',
      phone: '',
      loading: false,
    }
  },
  computed: {
    modalVisabil() {
      return this.$store.state.AuthModule.editUserModal
    },
  },
  mounted() {},
  watch: {
    user(user) {
      this.user_id = user.id
      this.name = user.name
      this.email = user.email
      this.phone = user.phone
      this.password = user.password
    },
  },
  methods: {
    ...mapActions(['USER_MODAL', 'GET_USER']),
    async saveUpdate() {
      this.loading = true
      let params = {
        name: this.name,
        email: this.email,
        phone: this.phone,
      }
      await axios
        .put(this.$store.state.baseUrl + `users/${this.user_id}`, { params })
        .then(() => {})
        .catch((err) => {
          console.log(err)
        })
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff9;
  z-index: 1;
  button {
    margin: 0 auto;
    justify-content: center;
    display: block;
    position: relative;
    top: 50%;
    font-size: 1.1rem;
  }
}
</style>
