<template>
  <div id="app">
    <h1> Book Details </h1>
    <!-- <button @click="getBookCountAPI"> Get Book Count </button> -->
    <p v-if="count !== null"> Book Details: {{ count }} </p>
    <p v-if="error"> {{ error }} </p>
    <pre>{{ jsondata }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: null,
      error: null,
      jsondata: null
    };
  },
  mounted() {
    this.getBooksAPI();
  },
  methods: {
    async getBooksAPI() {
      try {
        const response = await axios.get('https://getbooks-k5nl5mmsjq-uc.a.run.app');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error = ('Error fetching book details : ', error);
        this.error = error;
        this.count = null;
      }
    },
  },
};
</script>
