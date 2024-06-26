<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VueMarqueeSlider } from 'vue3-marquee-slider';
import '/node_modules/vue3-marquee-slider/dist/style.css'
const route = useRoute();
const gameInfo = ref({});

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
</script>

<template>
    <div class="container-fluid my-5" v-if="Object.keys(gameInfo).length > 0">
        <div class="d-flex flex-row align-items-baseline">
            <h1  class=" mx-5 mb-5">{{ gameInfo.name }}</h1>
            
            <a v-if="gameInfo.website" class=" website" :href="gameInfo.website">Website</a>
        </div>
        <div>
            <img v-if="false" :src="gameInfo.header_image" alt="game image" class="mx-5" />
        </div>
        <div class="d-flex flex-row justify-content-start mx-5 mb-5 price">
            <small :if="gameInfo.price_overview.final_formatted" >{{ gameInfo.price_overview?.final_formatted }}</small>
        </div>

    
        <div class="mx-5 description">
            <p><span style="" v-html="gameInfo.detailed_description"></span></p>
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

}
p {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}
.slider {
    
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

.description {
    padding: 2rem;
    border-radius: 10px;
    border: 2px solid #fff;
    background: rgb(211,106,13);
    background: linear-gradient(90deg, rgba(211,106,13,0.6503195028011204) 11%, rgba(211,146,13,0.840795693277311) 50%, rgba(211,106,13,0.6391150210084033) 95%);
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
}
</style>
