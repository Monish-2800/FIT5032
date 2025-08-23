<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': !!errors.username }"
                v-model="formData.username"
                @input="() => validateName(false)"
                @blur="() => validateName(true)"
              />
              <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': !!errors.password }"
                v-model="formData.password"
                @input="() => validatePassword(false)"
                @blur="() => validatePassword(true)"
              />
              <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" class="form-select" v-model="formData.gender">
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              v-model="formData.reason"
              placeholder="None"
            ></textarea>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" :disabled="!canSubmit">
              Submit
            </button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <div class="row mt-4" v-if="submittedCards.length">
          <div class="col-12">
            <DataTable
              :value="submittedCards"
              showGridlines
              stripedRows
              tableStyle="min-width: 60rem"
            >
              <Column field="username" header="Username" />
              <Column field="password" header="Password" />
              <Column field="isAustralian" header="Australian Resident" />
              <Column field="gender" header="Gender" />
              <Column field="reason" header="Reason" />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

// Seed rows to match the screenshot
const submittedCards = ref([
  { username: 'Jinx', password: '123456Qq@', isAustralian: true, gender: 'male', reason: 'None' },
  {
    username: 'Delvin',
    password: '123444@#Ww',
    isAustralian: true,
    gender: 'male',
    reason: 'Love reading',
  },
  {
    username: 'Yiwei',
    password: '456789$Rr',
    isAustralian: true,
    gender: 'male',
    reason: 'Feel Boring.',
  },
])

const errors = ref({ username: null, password: null })

const validateName = (blur) => {
  const name = formData.value.username.trim()
  errors.value.username = name.length < 3 && blur ? 'Name must be at least 3 characters' : null
}

const validatePassword = (blur) => {
  const p = formData.value.password
  const ok =
    p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p)
  errors.value.password = !ok && blur ? 'Min 8 chars incl. upper, lower, number, special.' : null
}

const canSubmit = computed(
  () =>
    formData.value.username.trim().length >= 3 &&
    !errors.value.username &&
    formData.value.password.length >= 8 &&
    !errors.value.password,
)

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (errors.value.username || errors.value.password) return
  submittedCards.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = { username: '', password: '', isAustralian: false, reason: '', gender: '' }
  errors.value.username = null
  errors.value.password = null
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
.text-break {
  word-break: break-word;
}
</style>
