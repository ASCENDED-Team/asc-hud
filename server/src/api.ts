import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';
import { useWebview } from '@Server/player/webview.js';
import { HUDEvents } from '../../shared/src/events.js';

function useHudAPI() {
    // Functions
    function seatbelt(player: alt.Player) {
        if (!player.vehicle) return;

        alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
    }
    function pushFuel(player: alt.Player, fuel: number) {
        const WebView = useWebview(player);

        WebView.emit(HUDEvents.WebView.PUSH_FUEL, fuel);
    }

    // Time is mantatory, bgcolor, progresscolor, textcolor optional but still use null do avoid messing with color
    // Color can be red/gray ... or even #30efa6
    function startProgress(
        player: alt.Player,
        time: number,
        bgcolor?: string,
        progresscolor?: string,
        textcolor?: string,
    ) {
        const WebView = useWebview(player);
        WebView.emit(HUDEvents.WebView.PROGRESS_BAR, time, bgcolor, progresscolor, textcolor);
    }

    return {
        seatbelt,
        pushFuel,
        startProgress,
    };
}

declare global {
    export interface ServerPlugin {
        ['ascended-hud-api']: ReturnType<typeof useHudAPI>;
    }
}

useApi().register('ascended-hud-api', useHudAPI());
