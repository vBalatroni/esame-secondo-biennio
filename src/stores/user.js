import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
    const username = ref('')
    const userId = ref('')
    const steamApiKey = 'E939381B29D7436FBA32224188468DE7';
    const gameLibrary = ref({});

    function fetchSteamUser (searchTerm) {
        console.log('searchterm: ' + searchTerm)
        const steamVanityUrl = searchTerm;
        const apiUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamApiKey}&vanityurl=${steamVanityUrl}`;
        console.log('apirrl: ' + apiUrl)

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.response && data.response.success === 1) {
                    username.value = searchTerm;
                    userId.value = data.response.steamid;
                    // console.log(data)
                } else {
                    console.error('Unable to fetch Steam user');
                    username.value = '';
                    userId.value = '';
                }
            })
            .catch(error => {
                console.error('Error fetching Steam user:', error);
            });
    };
    
    function fetchOwnedGames(){
        const apiUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${userId.value}&format=json&include_appinfo=true`
        console.log('apiurl: ' + apiUrl)
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                gameLibrary.value = data.response;
                console.log('data: ' + data.response)
            })
            .catch(error => {
                console.error('Error fetching Steam user games:', error);
            });
    }


    return { username, userId, fetchSteamUser, fetchOwnedGames, gameLibrary }
})