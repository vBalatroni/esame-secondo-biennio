<script setup>
import SearchBar from '../components/SearchBar.vue'
import GamesList from '../components/GamesList.vue'
import { useUserStore } from '@/stores/user'

const debug = true;
const searchedUser = useUserStore()
</script>

<template>
  <main>
    <SearchBar/>
      <div v-if="debug && searchedUser.username">
      <pre>
        user_id: {{searchedUser.userId}}  
        username: {{searchedUser.username}}
      </pre>
    </div>
    <div v-if="searchedUser.username && searchedUser.userId">
      {{searchedUser.username}}
      <GamesList/>
    </div>
  </main>
</template>
