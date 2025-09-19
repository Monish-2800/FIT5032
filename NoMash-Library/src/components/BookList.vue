<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        <div v-if="editingId !== book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="startEdit(book)">Edit</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </div>
        <div v-else>
          <input v-model="editedName" placeholder="Edit name" />
          <button @click="saveEdit(book.id)">Save</button>
          <button @click="cancelEdit()">Cancel</button>
        </div>
      </li>
    </ul>
  </div>

  <h2>Top 5 Newest Books</h2>
  <ul>
    <li v-for="book in newestBooks" :key="book.id">
      {{ book.name }} - ISBN: {{ book.isbn }}
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init.js'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  limit
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const editingId = ref(null)
    const editedName = ref('')

    const newestBooks = ref([])

    const fetchNewestBooks = async () => {
      const q = query(
        collection(db, 'books'),
        where('isbn', '>', 1000),
        orderBy('isbn', 'desc'),
        limit(5)
      )
      const snapshot = await getDocs(q)
      newestBooks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }


    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach(docSnap => {
          booksArray.push({ id: docSnap.id, ...docSnap.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    const deleteBook = async id => {
      try {
        await deleteDoc(doc(db, 'books', id))
        await fetchBooks()
        alert('Book deleted successfully!')
      } catch (error) {
        console.error('Error deleting book: ', error)
      }
    }

    const startEdit = book => {
      editingId.value = book.id
      editedName.value = book.name
    }

    const cancelEdit = () => {
      editingId.value = null
      editedName.value = ''
    }

    const saveEdit = async id => {
      try {
        await updateDoc(doc(db, 'books', id), { name: editedName.value })
        editingId.value = null
        editedName.value = ''
        await fetchBooks()
        alert('Book updated successfully!')
      } catch (error) {
        console.error('Error updating book: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
      fetchNewestBooks()
    })

    return {
      books,
      deleteBook,
      editingId,
      editedName,
      startEdit,
      cancelEdit,
      saveEdit,
      newestBooks
    }
  }
}
</script>
