import alt from 'alt-client';
import native from 'natives';
import { useWebview } from '@Client/webview/index.js';
import { HUDEvents } from '../../shared/src/events.js';

function setSeatbelt() {
    let value = !alt.Player.local.getMeta('SEATBELT');

    if (!alt.Player.local.vehicle) {
        value = false;
    }

    if (alt.Player.local.vehicle) {
        value
            ? native.setVehicleDoorsLocked(alt.Player.local.vehicle, 4)
            : native.setVehicleDoorsLocked(alt.Player.local.vehicle, 0);
    }

    alt.Player.local.setMeta('SEATBELT', value);
    native.setPedConfigFlag(alt.Player.local.scriptID, 32, value);

    useWebview().emit(HUDEvents.WebView.SEATBELT, value);
}

alt.onServer(HUDEvents.ToClient.SEATBELT, setSeatbelt);

