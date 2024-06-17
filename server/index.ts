import { useApi } from '@Server/api/index.js';
import { HudServerConfig } from './src/serverConfig.js';
import { HudConfig } from '../shared/config.js';
import './src/commands.js';
import './src/api.js';


HudServerConfig.init();

if(HudConfig.versionAPI) {
    const VersionCheckAPI = await useApi().getAsync('ascended-versioncheck-api');
    if (VersionCheckAPI.getAPIState() === true) {
        setTimeout(() => {
            VersionCheckAPI.checkVersion('https://github.com/ASCENDED-Team/asc-hud', 'asc-hud', 'v1.2');
        }, 250);
    }
}
