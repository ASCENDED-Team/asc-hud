import * as alt from 'alt-server';
import { HudServerConfig } from './src/serverConfig.js';
import './src/commands.js';
import './src/api.js';
import { HudConfig } from '../shared/config.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

const SyncedBinder = Rebar.systems.useStreamSyncedBinder();
SyncedBinder.syncCharacterKey('id');

HudServerConfig.init();

// Checks for updates...
if (HudConfig.checkForUpdates) {
    const hudVersion = 'v1.2';
    async function requestLatestVersion() {
        /* 
        ASCENDED-Team API Key. This will only work for our plugins.
        If you want to use our version check API - Feel free to contact us!
        Our Discord: https://discord.gg/HTKM9NdhVa 
        */
        const apiKey = 'qcsWTe_olrldSoni3K8AHkTeDCeu2rJiG5AKeqAWBBc';
        const url = `https://api.rebar-ascended.dev/versioncheck-api?url=ascended-team/asc-hud&version=${hudVersion}&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data: {
                repository: string;
                release: string;
                releasedAt: string;
                commitHash: string;
                latestCommit: string;
                isOutdated: boolean;
            } = await response.json();

            if (data.isOutdated) {
                alt.logWarning(
                    `[ASCENDED-API]: Your plugin: ${data.repository} is outdated. Latest Commit: ${data.latestCommit} | Version (${data.release}) | ${data.releasedAt}`,
                );
            } else {
                alt.logWarning(
                    `[ASCENDED-API]: Your plugin: ${data.repository} is up to date. Latest Commit: ${data.latestCommit} | Version (${data.release}) | ${data.releasedAt}`,
                );
            }
        } catch (error) {
            if (error.response) {
                alt.logWarning(
                    `[ASCENDED-Versioncheck-API] => No Response from Ascended API Server... Status: ${error.response.status}`,
                );
            } else {
                alt.logWarning(
                    `[ASCENDED-Versioncheck-API] => No Response from Ascended API Server... ${error.message}`,
                );
            }
        }
        return null;
    }

    setTimeout(() => {
        requestLatestVersion();
    }, 250);
}
