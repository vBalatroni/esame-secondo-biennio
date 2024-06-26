<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    game: Object
});

const playTime = ref(0);
const gameInfo = ref({});
const cardRef = ref(null);

const fetchGameInfo = (gameId) => {
    fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        gameInfo.value = data[gameId].data;
    })
    .catch(error => console.error('Error:', error)); 
};

onMounted(() => {
    fetchGameInfo(props.game.appid);
});
const playTimeHandler = (time) => {
    console.log(time);
    if (time > 59) {
        return Math.round(time / 60) + " hr";
    } else {
        return time + " m";
    }
};

const mouseMoveHandler = (evt, card) => {
    evt.preventDefault();
    const height = card.clientHeight;
    const width = card.clientWidth;

    requestAnimationFrame(() => {
        const xRotation = -30 * ((evt.layerY - height / 2) / height);
        const yRotation = 20 * ((evt.layerX - width / 2) / width);

        card.style.transform = `perspective(1000px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });
};

const mouseEnterHandler = (evt) => {
    evt.preventDefault();
    const card = evt.currentTarget;
    card.addEventListener("mousemove", (e) => mouseMoveHandler(e, card));
};

const mouseOutHandler = (evt) => {
    evt.preventDefault();
    const card = evt.currentTarget;
    card.style.transform = "perspective(1000px) scale(1) rotateX(0) rotateY(0)";
    card.removeEventListener("mousemove", (e) => mouseMoveHandler(e, card));
};


</script>

<template>
    <div class="card__wrapper" ref="cardRef" @mouseenter="mouseEnterHandler" @mouseout="mouseOutHandler">
        <p class="playtime">{{ playTimeHandler(game.playtime_forever) }}</p>
        <img class="bg_image" v-lazy="{src: gameInfo.header_image}" alt="game image">
        <div class="card">
            <div class="blob"></div>
            <div class="fakeblob"></div>
        </div>
    </div>
</template>

<style scoped>
    :root {
        --main-angle: 15deg;
        --secondary-angle: 22deg;
    }

    .card__wrapper {
        position: relative;
        width: auto;
        height: 150px;
    }

    .bg_image {
        z-index: -10;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    .playtime {
        pointer-events: none;
        font-weight: 900;
        color: white;
        opacity: 0.7;
        text-shadow: 0px 0px 10px #091833;
        position: absolute;
        right: 1rem;
        bottom: 0;
        z-index: 11;
        font-size: 3rem;
        margin: 0;
    }

    .blob {
        filter: blur(40px);
        position: absolute;
        z-index: -1;
        top: 0;
        opacity: 0;
        left: 0;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background: rgb(255, 255, 255, 0.5);
        transition: all 300ms ease-in-out;
    }

    .fakeblob {
        display: hidden;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }

    .card {
        position: relative;
        top: 0;
        height: 100%;
        overflow: hidden;
        padding: 10px;
        margin: 0;
        background: rgb(128 128 128 / 0.2);
        border-radius: 10px;
        position: relative;
        transition: all 300ms ease-in-out;
    }

    .inner {
        border-radius: 7px;
        padding: 10px;
        width: 210px;
        height: 150px;
        transition: all 300ms ease-in-out;
    }
</style>