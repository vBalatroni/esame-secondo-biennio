<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
const searchedUser = useUserStore()
const searchTerm = ref('');

</script>


<template>
  <div class="search-bar">
    {{ searchedUser.username }}
    <input v-model="searchTerm" type="text" placeholder="Search for a username" />
    <button @click="searchedUser.fetchSteamUser(searchTerm)" :disabled="searchTerm.length < 1">Search</button> 
    </div>
</template>