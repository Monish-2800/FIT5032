<template>
  <div class="signin-wrapper">
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signIn">Login</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase/init"

const email = ref("")
const password = ref("")
const router = useRouter()

const signIn = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const uid = userCredential.user.uid

    const userDoc = await getDoc(doc(db, "users", uid))
    if (!userDoc.exists()) {
      alert("No role assigned. Please contact admin.")
      return
    }

    const role = userDoc.data().role
    // console.log("Logged in as:", role)

    if (role === "admin") {
      router.push("/admin-dashboard")
    } else if (role === "librarian") {
      router.push("/librarian-dashboard")
    } else {
      router.push("/user-dashboard")
    }

  } catch (error) {
    console.error("Login failed:", error.code)
    alert("Login error: " + error.message)
  }
}
</script>

<style scoped>
.signin-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

input,
button {
  width: 250px;
  padding: 8px;
  margin: 8px 0;
  font-size: 16px;
}
</style>
