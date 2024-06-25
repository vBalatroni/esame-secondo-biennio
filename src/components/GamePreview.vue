<script setup>
import {onMounted, toRefs, ref } from 'vue';
const props = defineProps({
    game: Object
})

const gameInfo = ref({});

const {game} = toRefs(props);

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
    fetchGameInfo(game.value.appid)
})

const all = document.querySelectorAll(".card");

window.addEventListener("mousemove", (ev) => {
  
  all.forEach((e) => {
    const blob = e.querySelector(".blob");
    const fblob = e.querySelector(".fakeblob");
    const rec = fblob.getBoundingClientRect();
    blob.style.opacity = "1";
  
    blob.animate(
      [
        {
          transform: `translate(${
            (ev.clientX - rec.left) - (rec.width / 2)
          }px,${(ev.clientY - rec.top) - (rec.height / 2)}px)`
        }
      ],
      {
        duration: 300,
        fill: "forwards"
      }
    );
  });
});

</script>

<template>
    <div class="card__wrapper">
        <img class="bg_image" :src="gameInfo.header_image" alt="game image">
        <div class="card">
        <div class="inner">
        </div>
        <div class="blob"></div>
        <div class="fakeblob"></div>
        </div>

 
    </div>
</template>

<style scoped>

    .card__wrapper {
        position: relative;
       
        width: auto;
        height: 150px;
    }

    .bg_image {
        z-index:-10;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
          border-radius: 10px;

    }

/*
    

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
    } */

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

/* .card:hover > .inner {
  background: rgb(26,26,26, 0.6);
  backdrop-filter: blur(80px);
} */

    
</style>