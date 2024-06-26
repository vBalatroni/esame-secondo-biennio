<script setup>
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Game from './GamePreview.vue';

const searchedUser = useUserStore();
const addMoreCounter = ref(0);
const isLoading = ref(true);

const props = defineProps({
    username: String
});

const fetchUserData = (username) => {
    console.log('Fetching data for user:', username);
    isLoading.value = true;
    searchedUser.fetchSteamUserId(username)
        .then(() => {
            console.log('The steamID for', username, 'is', searchedUser.userId);
            return searchedUser.fetchOwnedGames(searchedUser.userId);
        })
        .then(() => {
            console.log('The games for', username, 'are', searchedUser.gameLibrary.games);
            isLoading.value = false;
        })
        .catch(error => {
            console.error('Error:', error);
            isLoading.value = false;
        });
};

onMounted(() => {
    console.log('MOUNTED START');
    fetchUserData(props.username);
    console.log('MOUNTED END');
});

watch(() => props.username, (newUsername, oldUsername) => {
    console.log(`Username changed from ${oldUsername} to ${newUsername}`);
    fetchUserData(newUsername);
});

const filterByPlaytime = () => {
    searchedUser.gameLibrary.games.sort((a, b) => {
        return b.playtime_forever - a.playtime_forever;
    });
};

const removeNeverPlayed = () => {
    searchedUser.gameLibrary.games = searchedUser.gameLibrary.games.filter(game => game.playtime_forever > 0);
};

const addMoreGames = () => {
    addMoreCounter.value += 6;
};
</script>

<template>
    <div class="container">
        <h2 class="mx-auto text-center owner my-4">{{ searchedUser.username }}'s library</h2>
        <div class="row">
            <div class="col-8 text-start">
                <button @click="filterByPlaytime">Sort by playtime</button>
                <button class="ms-4" @click="removeNeverPlayed">Remove never played</button>
            </div>
            <div class="col-4 text-end games">
                {{ searchedUser.gameLibrary.games?.length }} Games
            </div>
        </div>

        <div v-if="isLoading" class="spinner-container">
            <div class="loader"></div>
        </div>

        <div class="row" v-else>
            <div class="col-12">
                <div class="row boxes">
                    <div class="col-lg-4 col-md-6 col-sm-12 my-4 game__preview" v-for="game in searchedUser.gameLibrary.games?.slice(0, 6 + addMoreCounter)" :key="game.appid">
                        <RouterLink :to="{ name: 'game', params: { id: game.appid }}">
                            <Game :game="game"/>
                        </RouterLink>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <button @click="addMoreGames">Load More</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
a {
    text-decoration: none;
}



.owner {
    color: white;
    font-size: 2rem;
    margin-top: 2rem;
}

button {
    text-align: center;
    border: 2px solid #ff6643;
    background: transparent;
    color: white;
    font-weight: 900;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease-in;
}

.games {
    color: white;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
}

button:hover {
    background: linear-gradient(135deg, #ff6433 0, #fe9d3a 50%, #fe9d3a 100%);
    box-shadow: 0 10px 30px -10px rgba(254, 157, 58, 0.25), 0 10px 30px -10px rgba(254, 157, 58, 0.5), 0 10px 35px -10px rgba(254, 157, 58, 0.5);
}

/* Spinner styles */
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 100%;
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>