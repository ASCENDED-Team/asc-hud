import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';
import { useWebview } from '@Server/player/webview.js';
import { HUDEvents } from '../../shared/src/events.js';

function useHudAPI() {
    function seatbelt(player: alt.Player) {
        if (!player.vehicle) return;

        alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
    }

    function pushFuel(player: alt.Player, fuel: number) {
        if (!player.vehicle) return;
        const WebView = useWebview(player);

        WebView.emit(HUDEvents.WebView.PUSH_FUEL, fuel);
    }

    function pushMilage(player: alt.Player, milage: number) {
        if (!player.vehicle) return;
        const WebView = useWebview(player);

        WebView.emit(HUDEvents.WebView.PUSH_MILAGE, milage);
    }

    async function createProgressBar(
        player: alt.Player,
        time: number,
        bgColor?: string,
        progressColor?: string,
        textColor?: string,
        callback?: (...args: any[]) => void,
        ...callbackArgs: any[]
    ) {
        const WebView = useWebview(player);
        WebView.emit(HUDEvents.WebView.PROGRESS_BAR, time, bgColor, progressColor, textColor);
        if (callback) {
            alt.setTimeout(() => {
                callback(...callbackArgs);
            }, time);
        }
    }

    return {
        seatbelt,
        pushFuel,
        pushMilage,
        createProgressBar,
    };
}

declare global {
    export interface ServerPlugin {
        ['ascended-hud-api']: ReturnType<typeof useHudAPI>;
    }
}

useApi().register('ascended-hud-api', useHudAPI());
