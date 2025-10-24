<template>
  <div class="register-wrapper">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
      <select v-model="role">
        <option disabled value="">Select Role</option>
        <option value="user">User</option>
        <option value="librarian">Librarian</option>
        <option value="admin">Admin</option>
      </select>
    </p>
    <p><button @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/firebase/init"

const email = ref("")
const password = ref("")
const role = ref("")
const router = useRouter()

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const uid = userCredential.user.uid
    await setDoc(doc(db, "users", uid), {
      email: email.value,
      role: role.value,
    })
    alert("User registered successfully!")
    router.push("/FireLogin")
  } catch (error) {
    console.error("Registration failed:", error.code)
    alert("Error: " + error.message)
  }
}
</script>

<style scoped>
.register-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

input,
select,
button {
  width: 250px;
  padding: 8px;
  margin: 8px 0;
  font-size: 16px;
}

button {
  cursor: pointer;
}
</style>
