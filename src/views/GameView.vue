<script setup>
import {onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();

const gameInfo = ref({});

const fetchGameInfo = (gameId) => {
    fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        gameInfo.value = data[gameId].data
    })
    .catch(error => console.error('Error:', error)); 
}
onMounted(() => {
    fetchGameInfo(route.params.id)
})
</script>

<template>
    <div class="card__wrapper">
        
        <img class="bg_image" :src="gameInfo.header_image" alt="game image">
        <div class="overlay"></div>
        <div class="info__wrapper">
        </div>
    </div>
</template>

<style scoped>

    .card__wrapper {
        position: relative;
        background: red;
        width: auto;
        height: 217px;
    }

    .bg_image, .overlay {
        z-index: 1;
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .info__wrapper {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        position: relative;
        z-index: 10;
        color: white;
    }

    .overlay {
        background-color: #31313150;
        mix-blend-mode: multiply;
    }
</style>