import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
    const username = ref('')
    const userId = ref('')
    // const steamApiKey = import.meta.env.VITE_SITE_NAME;
    // console.log('steamapikey: ' + steamApiKey);
    const gameLibrary = ref({});
    const error = ref('');
    function fetchSteamUserId(searchedUsername, steamApiKey) {
        const apiUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamApiKey}&vanityurl=${searchedUsername}`;
        // console.log('apirrl: ' + apiUrl)

        return new Promise((resolve, reject) => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.response && data.response.success === 1) {
                        error.value = '';
                        username.value = searchedUsername;
                        userId.value = data.response.steamid;
                        resolve(data.response.steamid);
                        // console.log(data)
                    } else {
                        error.value = 'User does not exist :(';
                        console.error('Unable to fetch Steam user');
                        username.value = '';
                        userId.value = '';
                        reject('User does not exist :(')
                    }
                })
                .catch(error => {
                    console.error('Error fetching Steam user:', error);
                    reject('Error fetching Steam user');
                });
        })
        
    };
    
    function fetchOwnedGames(username, steamApiKey){
        const apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${userId.value}&format=json&include_appinfo=true`
        // console.log('apiurl: ' + apiUrl)
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                gameLibrary.value = data.response;
                // console.log('data: ' + data.response)
            })
            .catch(error => {
                console.error('Error fetching Steam user games:', error);
            });
    }


    return { username, userId, fetchSteamUserId, fetchOwnedGames, gameLibrary, error}
})