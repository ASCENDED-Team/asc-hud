import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { HUDEvents } from '../../shared/src/events.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();
const HudAPI = await Rebar.useApi().getAsync('ascended-hud-api');

messenger.commands.register({
    name: '/seatbelt',
    desc: 'Toggle your seatbelt on or off.',
    callback: async (player: alt.Player) => {
        if (!player.vehicle) return;

        alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
    },
});

messenger.commands.register({
    name: '/testbar',
    desc: 'test your progress bar. time bgcolor progresscolor textcolor',
    callback: async (player: alt.Player, time: number, bgColor: string, progressColor: string, textColor: string) => {
        if (!time) {
            time = 1000 * 10; // 10 Seconds
        }
        
        HudAPI.createProgressBar(player, time, bgColor, progressColor, textColor, testFunctionForCallbackProgress);
    },
});

alt.on('playerLeftVehicle', (player: alt.Player) => {
    alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
});

function testFunctionForCallbackProgress() {
    alt.logWarning(`This is just a test!`);
}