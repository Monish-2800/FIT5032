<template>
  <div class="logout-panel">
    <p>Logged in as: <strong>{{ userEmail }}</strong> (role: <strong>{{ userRole }}</strong>)</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { auth, db } from "../firebase/init"
import { doc, getDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"

const router = useRouter()
const userEmail = ref("")
const userRole = ref("")

onMounted(async () => {
  const user = auth.currentUser
  if (user) {
    userEmail.value = user.email

    console.log("Current user object:", user)

    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      userRole.value = userDoc.data().role

      console.log(`Logged in as: ${user.email} (role: ${userRole.value})`)
    }
  } else {
    console.warn("No user is currently logged in")
  }
})

const logout = async () => {
  await signOut(auth)
  alert("Logged out!")
  router.push("/FireLogin")
}
</script>

<style scoped>
.logout-panel {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
