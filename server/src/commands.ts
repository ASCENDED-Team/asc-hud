import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();

messenger.commands.register({
    name: '/seatbelt',
    desc: 'Toggle your seatbelt on or off.',
    callback: async (player: alt.Player) => {
        if (!player.vehicle) return;

        alt.emitClient(player, 'ASC:HUD:SEATBELT');
    },
});

messenger.commands.register({
    name: '/revive',
    desc: 'Toggle your seatbelt on or off.',
    callback: async (player: alt.Player) => {
        player.health = 200;
        player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);
    },
});

alt.on('playerLeftVehicle', (player: alt.Player) => {
    alt.emitClient(player, 'ASC:HUD:SEATBELT');
});
