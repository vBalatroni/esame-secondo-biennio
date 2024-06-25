<script setup>

import { ref, watch, onMounted} from 'vue';
import { useUserStore } from '@/stores/user';
import Game from './GamePreview.vue';
const searchedUser = useUserStore()

onMounted(() => {
    console.log('mounted')
    searchedUser.fetchOwnedGames()
})

// Usa un watcher per monitorare i cambiamenti specifici nella libreria di giochi
watch(
  () => searchedUser.username,
  (newVal, oldVal) => {
    searchedUser.fetchOwnedGames()
    console.log('Game library updated', newVal);
  }
);

</script>

<template>
  <div class="container">
    <div class="row row cyberpunk-selection" v-if="searchedUser.gameLibrary">
        <div class="col-12">
            <div class="row boxes ">
                <div class="col-lg-4 col-md-6 col-sm-12  my-4 cyberpunk-box " v-for="game in searchedUser.gameLibrary.games?.slice(0, 5)" :key="game.appid">
                    <RouterLink :to="{name: 'game', params: {id: game.appid}}">
                        <Game :game="game"/>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style>
a {
    text-decoration: none;
}

    
</style>