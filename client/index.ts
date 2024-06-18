import alt from 'alt-client';
import { useWebview } from '@Client/webview/index.js';
import { HUDEvents } from '../shared/src/events.js';
import { HudConfig } from '../shared/config.js';

if (HudConfig.enableSeatbelt) {
    import('./src/seatbelt.js')
        .then(module => {
            console.log('Seatbelt module loaded:', module);
        })
        .catch(error => {
            console.error('Error loading seatbelt module:', error);
        });
}

useWebview().show('Hud', 'overlay');

const onlinePlayers = alt.Player.all.length;
useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, onlinePlayers);

alt.setInterval(() => {
    useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, onlinePlayers);
}, 1000);
