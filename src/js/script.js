import { steamIdResolver } from './node_modules/steamid-resolver/steamid-resolver';
steamIdResolver.customUrlToSteamID64("https://steamcommunity.com/id/username").then((steamID64) => {console.log(steamID64)});