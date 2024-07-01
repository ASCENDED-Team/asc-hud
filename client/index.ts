import alt from 'alt-client';

import { useWebview } from '@Client/webview/index.js';
import { HUDEvents } from '../shared/src/events.js';
import { HudConfig } from '../shared/config.js';

useWebview().show('Hud', 'overlay');

if (HudConfig.enableSeatbelt) {
    await import('./src/seatbelt.js');
}

useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, alt.Player.all.length);

alt.setInterval(() => {
    const onlinePlayers = alt.Player.all.length;
    useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, onlinePlayers);
}, HudConfig.onlinePlayersInterval);

alt.on('connectionComplete', () => {
    const onlinePlayers = alt.Player.all.length;
    useWebview().emit(HUDEvents.WebView.UPDATE_PLAYERS, onlinePlayers);
});
