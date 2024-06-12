import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';
import { useWebview } from '@Server/player/webview.js';
import { HUDEvents } from '../../shared/src/events.js';

function useHudAPI() {
    // Functions
    function pushFuel(player: alt.Player, fuel: number) {
        const WebView = useWebview(player);

        WebView.emit(HUDEvents.WebView.PUSH_FUEL, fuel);
    }
    
    return {
        pushFuel
    }
}

declare global {
    export interface ServerPlugin {
        ['ascended-hud-api']: ReturnType<typeof useHudAPI>;
    }
}

useApi().register('ascended-hud-api', useHudAPI());