import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { HUDEvents } from '../../shared/src/events.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();
const api = Rebar.useApi().getAsync('ascended-hud-api');

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
    desc: 'Toggle your seatbelt on or off.',
    callback: async (player: alt.Player, time: number) => {
        if (!time) return; //100 = 10 sec
        (await api).startProgress(player, time);
    },
});

alt.on('playerLeftVehicle', (player: alt.Player) => {
    alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
});
