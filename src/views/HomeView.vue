<script setup>
import SearchBar from '../components/SearchBar.vue'
import GamesList from '../components/GamesList.vue'
import { useUserStore } from '@/stores/user'
import { watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import router from '@/router';
const route = useRoute();
const queryChanged = ref(Boolean);
const searchedUser = ref('');
// const searchedUser = useUserStore()

onMounted(() => {
  if (route.query.username) {
    searchedUser.value = route.query;
  }
});
watch(
  () => route.query,
  (newVal, oldVal) => {
    if (newVal.username) {
        queryChanged.value = true;
        searchedUser.value = newVal;
        console.log('Route query changed', newVal, oldVal);
    }
    else {
        queryChanged.value = true;
        searchedUser.value = '';
    }
   
  }
);
const debug = false;
</script>

<template>
  <main>
    <h1>Steam Time Tracker</h1>
    <SearchBar/>
    <div v-if="searchedUser.username">
      <GamesList :username="searchedUser.username"/>
    </div>
  </main>
</template>
<style scoped>
  h1 {
    color: white;
    text-align: center;
    margin-top: 2rem;
    font-size: 3rem;
  }
</style>