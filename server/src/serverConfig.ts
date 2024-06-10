import { useRebar } from '@Server/index.js';
import { HudConfig } from '../../shared/config.js';

const Rebar = useRebar();
const serverConfig = Rebar.useServerConfig();

export const HudServerConfig = {
    init() {
        if (HudConfig.hideAreaName) {
            serverConfig.set('hideAreaName', true);
        }

        if (HudConfig.hideHealthArmor) {
            serverConfig.set('hideHealthArmour', true);
        }

        if (HudConfig.hideMinimapOnFoot) {
            serverConfig.set('hideMinimapOnFoot', true);
        }

        if (HudConfig.hideStreetName) {
            serverConfig.set('hideStreetName', true);
        }

        if (HudConfig.hideVehicleClass) {
            serverConfig.set('hideVehicleClass', true);
        }

        if (HudConfig.hideVehicleName) {
            serverConfig.set('hideVehicleName', true);
        }
    },
};
