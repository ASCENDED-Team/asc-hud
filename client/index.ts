import alt from 'alt-client';
import { useWebview } from '@Client/webview/index.js';

useWebview().show('Hud', 'overlay');

alt.everyTick(() => {
    const speed = alt.Player.local.vehicle ? alt.Player.local.vehicle.speed : alt.Player.local.moveSpeed;
    alt.log(`Speed: ${speed}`);
});
