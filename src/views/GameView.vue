<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VueMarqueeSlider } from 'vue3-marquee-slider';
import '/node_modules/vue3-marquee-slider/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const route = useRoute();
const gameInfo = ref({});
const router = useRouter();
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
    fetchGameInfo(route.params.id);
});

const goBack = () => {
    router.go(-1);
};
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class="container-fluid my-5" v-if="Object.keys(gameInfo).length > 0">
        <div class="mx-5 back button mb-4"><button type="submit" @click="goBack()">←</button></div>
        <div class="mx-5 mb-4">
            <h1>{{ gameInfo.name }}</h1>
            <a v-if="gameInfo.website" target="_blank" class=" website mt-5" :href="gameInfo.website">{{gameInfo.website}}</a>
        </div>
        <div>
            <img v-if="false" :src="gameInfo.header_image" alt="game image" class="mx-5" />
        </div>
        <div class="d-flex flex-row justify-content-start mx-5 mb-5 price">
            <small :if="gameInfo.price_overview?.final_formatted" >{{ gameInfo.price_overview?.final_formatted }}</small>
        </div>

    
        <div class="description__wrapper mx-5 px-0">
            <div class="description">
                <p><span style="" v-html="gameInfo.detailed_description"></span></p>
            </div>
        </div>
      
            
        <div class="d-flex flex-row mx-5 justify-content-center my-4">
            <h3 class="os" v-if="gameInfo.platforms?.windows">Windows</h3>
            <h3 class="os" v-if="gameInfo.platforms?.mac">Mac</h3>
            <h3 class="os" v-if="gameInfo.platforms?.linux">Linux</h3>
        </div>
            <div class="slider px-0">
                <VueMarqueeSlider class="mx-5"
                id="marquee-slider-loop"
                :speed="40000"
                :width="400"
                :space="64"
                :paused="false"
                >
                <img
                    v-for="(image, index) in gameInfo.screenshots.length"
                    :key="index"
                    :src="gameInfo.screenshots[index]?.path_full"
                />
                </VueMarqueeSlider>
                
            </div>
        </div>
</template>

<style scoped>

img {
    width: 100% !important;
    border-radius: 10px !important;
    max-width: -webkit-fill-available !important;
}
p {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

.website {
    text-decoration: 1px solid white underline;
    font-size: 1.5rem;
    padding-top: 4rem;
}
a {
    color   : white !important;    
}
.os {
    padding-left: 2rem;
    padding-right: 2rem;
}
.container-fluid {
    padding: 0;
    color: white;
}
p {
    font-size: 21px;
    margin-bottom: 1rem;
}
h2 {
    font-weight: 600;
    font-family: "Antonio" !important;
}

.price {
    font-size: 4rem !important;
    font-weight: 600;
}
.slider {
    background: rgb(49,49,49);
background: linear-gradient(90deg, rgba(49,49,49,1) 0%, rgba(49,49,49,1) 5%, rgba(145,24,24,1) 50%, rgba(49,49,49,1) 95%, rgba(49,49,49,1) 100%);
    padding-top: 4rem;
    padding-bottom: 4rem;
}
h1 {
    font-size: 6rem;
    font-weight: 800;
}

@media (max-width: 768px) {
    h1 {
        font-size: 3rem;
    }
}
pre {
    color: white;
}
.game__wrapper {
   color: white;
}

img {
    width: 100% !important;
}

.description__wrapper {
    
}
.description {
    padding: 2rem;
    border-radius: 10px;
    color: white;
    border: 2px solid #fff;
        background-blend-mode:multiply;
    background: #313131;

    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
}
</style>
