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
    searchedUser.fetchSteamUserId(username,import.meta.env.VITE_STEAM_API_KEY)
        .then(() => {
            console.log('The steamID for', username, 'is', searchedUser.userId);
            return searchedUser.fetchOwnedGames(searchedUser.userId, import.meta.env.VITE_STEAM_API_KEY);
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
    <div v-if=" searchedUser.userId" class="container">
        <h2 class="mx-auto text-center owner mt-4 mb-4 mb-lg-5 "><span class="current_user">{{ searchedUser.username }}</span><span class="label-user"> 's library</span></h2>
        <div class="row justify-content-center align-items-baseline my-4">
            <div class="col-12 row col-lg-6 text-start d-flex my-lg-0 my-4 flex-row justify-content-center">
                <div class="col-12  col-lg-6">
                    <button class="w-100 mb-4 mb-lg-0" @click="filterByPlaytime">Sort by playtime</button>
                </div>
                <div class="col-12 col-lg-6">
                    <button class=" w-100" @click="removeNeverPlayed">Remove never played</button>
                </div>
            </div>
            <div class="col-12 col-lg-6 text-center text-lg-end games px-4 px-lg-3 mt-3 mt-lg-0">
                {{ searchedUser.gameLibrary.games?.length }} Games
            </div>
        </div>

        <div v-if="isLoading" class="spinner-container">
            <div class="loader"></div>
        </div>

        <div class="row" v-else>
            <div class="col-12 px-4 px-lg-4">
                <div class="row boxes ">
                    <div class="col-md-6 col-lg-4 col-sm-12 my-4 game__preview" v-for="game in searchedUser.gameLibrary.games?.slice(0, 6 + addMoreCounter)" :key="game.appid">
                        <RouterLink :to="{ name: 'game', params: { id: game.appid }}">
                            <Game :game="game"/>
                        </RouterLink>
                    </div>
                </div>
                <div class="text-center my-4">
                    <button @click="addMoreGames">Load More</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h2 class="mx-auto text-center owner my-4">{{ searchedUser.error }}</h2>
    </div>
</template>

<style>
a {
    text-decoration: none;
}


.current_user {
    color: #ff6433;
    font-weight: 700;
}

.label-user {
    font-weight: 400;
    font-size: 1.5rem;
}

.owner {
    color: white;
    font-size: 2rem;
}

button {
    text-align: center;
    border: 2px solid #ff6643;
    background: transparent;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.5rem;
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
