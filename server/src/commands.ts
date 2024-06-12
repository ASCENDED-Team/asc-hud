import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { HUDEvents } from '../../shared/src/events.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();

messenger.commands.register({
    name: '/seatbelt',
    desc: 'Toggle your seatbelt on or off.',
    callback: async (player: alt.Player) => {
        if (!player.vehicle) return;

        alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
    },
});

alt.on('playerLeftVehicle', (player: alt.Player) => {
    alt.emitClient(player, HUDEvents.ToClient.SEATBELT);
});
