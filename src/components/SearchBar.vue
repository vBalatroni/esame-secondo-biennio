<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import router from '@/router';
const route = useRoute();

// const searchedUser = useUserStore()
const searchedUser = ref('')
const searchTerm = ref('');

onMounted(() => {
  if (route.query.username) {
    searchTerm.value = route.query.username;
  }
});
const handleSubmit = () => {
    console.log(router.push('/?username=' + searchTerm.value))
    // searchedUser.fetchSteamUserId(searchTerm.value)
}
</script>


<template>
  <div class="search-bar">
    <div class="container">
        <div class="row">
            <div class="col-12 mx-auto my-4 d-flex justify-content-center flex-row">
                <form @submit.prevent="handleSubmit">
                <input v-model="searchTerm" type="text" placeholder="Cerca un nome utente" />
                <button type="submit" :disabled="searchTerm.length < 1">Cerca</button>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>

button {
    background: linear-gradient(135deg,#ff6433 0,#fe9d3a 50%,#fe9d3a 100%);
    border: none;
    color: white;
    font-weight: 800;
    padding: 16px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;
    transition: .2s ease-in;
}

input {
    padding: 1rem;
    border-radius: 5px;
    border: none;
}

button:hover {
        box-shadow: 0 10px 30px -10px rgba(254, 157, 58, .25), 0 10px 30px -10px rgba(254, 157, 58, .5), 0 10px 35px -10px rgba(254, 157, 58, .5);

 }
</style>
