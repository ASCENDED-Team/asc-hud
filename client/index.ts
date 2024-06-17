import alt from 'alt-client';
import { useWebview } from '@Client/webview/index.js';
import { HUDEvents } from '../shared/src/events.js';
import './src/seatbelt.js';

useWebview().show('Hud', 'overlay');

const onlinePlayers = alt.Player.all.length;
useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, onlinePlayers);

alt.setInterval(() => {
    useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, onlinePlayers);
}, 1000);
