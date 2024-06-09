import alt from 'alt-client';
import native from 'natives';
import { useWebview } from '@Client/webview/index.js';
import './src/seatbelt.js';

useWebview().show('Hud', 'overlay');

// Remove this if you don't want to hide these components
alt.everyTick(() => {
    native.hideHudComponentThisFrame(6); // Vehicle Name
    native.hideHudComponentThisFrame(8); // Vehicle Class
    native.hideHudComponentThisFrame(9); // Street Name
    native.hideHudComponentThisFrame(7); // Area Name
});
