import alt from 'alt-client';
import native from 'natives';
import { useWebview } from '@Client/webview/index.js';

function setSeatbelt() {
    let value = !alt.Player.local.getMeta('SEATBELT');

    if (!alt.Player.local.vehicle) {
        value = false;
    }

    alt.Player.local.setMeta('SEATBELT', value);
    native.setPedConfigFlag(alt.Player.local.scriptID, 32, value);

    useWebview().emit('ASC:HUD:SEATBELT', value);
}

alt.onServer('ASC:HUD:SEATBELT', setSeatbelt);
