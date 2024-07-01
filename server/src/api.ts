import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';
import { useWebview } from '@Server/player/webview.js';
import { HUDEvents } from '../../shared/src/events.js';

function useHudAPI() {
    function seatbelt(player: alt.Player) {
        if (!player.vehicle) return;

        alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
    }

    function pushData<T>(player: alt.Player, event: string, data: T, isVehicle = false) {
        if (isVehicle) {
            if (!player.vehicle) return;
        }
        const WebView = useWebview(player);

        WebView.emit(event, data);
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

    function GetHUDEvents() {
        return HUDEvents;
    }

    return {
        seatbelt,
        pushData,
        createProgressBar,
        GetHUDEvents,
    };
}

declare global {
    export interface ServerPlugin {
        ['ascended-hud-api']: ReturnType<typeof useHudAPI>;
    }
}

useApi().register('ascended-hud-api', useHudAPI());
