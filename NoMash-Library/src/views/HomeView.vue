<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'W5LibraryRegistrationForm' })

const formData = ref({
  username: '',
  gender: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  suburb: 'Clayton'
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  reason: null
})

const reasonPositiveNote = computed(() => {
  const txt = formData.value.reason?.toLowerCase() || ''
  return txt.includes('friend') ? 'Great to have a friend' : ''
})

const validateUsername = (blur) => {
  if (formData.value.username.trim().length === 0 && blur) {
    errors.value.username = 'Username is required.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const p = formData.value.password
  if (!p && blur) {
    errors.value.password = 'Password is required.'
  } else {
    errors.value.password = null
  }
  validateConfirmPassword(blur)
}

const validateConfirmPassword = (blur) => {
  if (!formData.value.confirmPassword && blur) {
    errors.value.confirmPassword = 'Please confirm your password.'
    return
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = (blur) => {
  const min = 10
  if (formData.value.reason.trim().length < min) {
    if (blur) errors.value.reason = `Reason must be at least ${min} characters`
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateReason(true)

  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.reason) {
    const masked = '•'.repeat(Math.min(formData.value.password.length || 0, 12))
    submittedCards.value.push({
      username: formData.value.username,
      password: masked,
      isAustralian: formData.value.isAustralian,
      gender: formData.value.gender,
      reason: formData.value.reason
    })

  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    gender: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    suburb: 'Clayton'
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    reason: null
  }
}
</script>

<template>
  <div class="container mt-2">
    <h2 class="text-center fw-bold"> W5. Library Registration Form</h2>
    <p class="text-center text-muted mb-4">
      Let's build some more advanced features into our form.
    </p>

    <form @submit.prevent="submitForm" class="mb-3">

      <div class="row g-3 mb-1">
        <div class="col-md-6">
          <label for="username" class="form-label">Username</label>
          <input id="username" type="text" class="form-control" v-model="formData.username"
            @blur="() => validateUsername(true)" @input="() => validateUsername(false)" />
          <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
        </div>
        <div class="col-md-6">
          <label for="gender" class="form-label">Gender</label>
          <select id="gender" class="form-select" v-model="formData.gender">
            <option value="" disabled>Select…</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>


      <div class="row g-3 mb-1">
        <div class="col-md-6">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" class="form-control" v-model="formData.password"
            @blur="() => validatePassword(true)" @input="() => validatePassword(false)" />
          <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
        </div>
        <div class="col-md-6">
          <label for="confirmPassword" class="form-label">Confirm password</label>
          <input id="confirmPassword" type="password" class="form-control" v-model="formData.confirmPassword"
            @blur="() => validateConfirmPassword(true)" @input="() => validateConfirmPassword(false)" />
          <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
        </div>
      </div>


      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="resident" v-model="formData.isAustralian" />
        <label class="form-check-label" for="resident">Australian Resident?</label>
      </div>


      <div class="mb-1">
        <label for="reason" class="form-label">Reason for joining</label>
        <textarea id="reason" class="form-control" rows="3" v-model="formData.reason" @blur="() => validateReason(true)"
          @input="() => validateReason(false)" />
      </div>
      <small v-if="errors.reason" class="text-danger d-block mb-2">{{ errors.reason }}</small>
      <small v-else-if="reasonPositiveNote" class="text-success d-block mb-2">{{ reasonPositiveNote }}</small>


      <div class="mb-3">
        <label for="suburb" class="form-label">Suburb</label>
        <input id="suburb" class="form-control" v-model="formData.suburb" />
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-secondary" type="button" @click="clearForm">Clear</button>
      </div>
    </form>


    <div class="row mt-4">
      <h5>This is a Datatable.</h5>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Australian Resident</th>
              <th>Gender</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in submittedCards" :key="i">
              <td>{{ row.username }}</td>
              <td>{{ row.password }}</td>
              <td>{{ row.isAustralian }}</td>
              <td>{{ row.gender }}</td>
              <td>{{ row.reason }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div class="row mt-4" v-if="submittedCards.length">
      <div class="d-flex flex-wrap justify-content-start">
        <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem">
          <div class="card-header bg-primary text-white">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
            <li class="list-group-item">Gender: {{ card.gender || '-' }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.8rem;
}

small {
  font-size: 0.95rem;
}
</style>