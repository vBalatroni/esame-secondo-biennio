<script setup>
import { ref } from 'vue';

const userName = ref('');
const steamUser = ref(null);
const steamApiKey = '7C0A522B33B63FBB48CA0FC5D81E72C1';
const steamVanityUrl = 'johnbala97';

const fetchSteamUser = () => {
  const steamApiKey = '7C0A522B33B63FBB48CA0FC5D81E72C1';
  const steamVanityUrl = userName.value;
  const apiUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamApiKey}&vanityurl=${steamVanityUrl}`;
    console.log('we')
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
      if (data.response && data.response.success === 1) {
        steamUser.value = data.response;
      } else {
        console.error('Unable to fetch Steam user');
      }
    })
    .catch(error => {
      console.error('Error fetching Steam user:', error);
    });
};
</script>


<template>
  <div class="search-bar">
    <input v-model="userName" type="text" placeholder="Search for a username" />
    <button @click="fetchSteamUser">Search</button> 
    </div>
</template>