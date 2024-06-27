<script setup>
import SearchBar from '../components/SearchBar.vue'
import GamesList from '../components/GamesList.vue'
import { watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute();
const queryChanged = ref(Boolean);
const searchedUser = ref('');
const siteName = import.meta.env.VITE_SITE_NAME;
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
  <main class="mx-1 mx-md-5 mt-5">
    <h1>{{siteName}}</h1>
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