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

// Check for Updates...
if (HudConfig.checkForUpdates) {
    async function requestLatestVersion() {
        const apiKey = 'qcsWTe_olrldSoni3K8AHkTeDCeu2rJiG5AKeqAWBBc';
        const repoUrl = 'ascended-team/asc-hud';

        try {
            const commitResponse = await fetch(`https://api.github.com/repos/${repoUrl}/commits/main`);
            if (!commitResponse.ok) {
                throw new Error(`Failed to fetch commit hash: ${commitResponse.status}`);
            }
            const commitData = await commitResponse.json();
            const currentCommitHash = commitData.sha;

            const apiUrl = `http://api.rebar-ascended.dev:5072/versioncheck-api?url=${repoUrl}&version=${currentCommitHash}&apiKey=${apiKey}`;

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();

            let message = `[\x1b[35mASCENDED-Repository\x1b[0m] => \x1b[35m${data.repository}\x1b[0m is `;
            if (data.isOutdated) {
                message += `\x1b[31mOUTDATED\x1b[0m`;
            } else {
                message += '\x1b[32mUPDATED\x1b[0m';
            }
            message += `. Latest Commit: ${data.latestCommit} (${data.latestCommitHash.slice(0, 5)})`;

            alt.log(message);
        } catch (error) {
            alt.logWarning(
                `[\x1b[35mASCENDED\x1b[0m-Versioncheck-API] => \x1b[31mError checking for updates:\x1b[0m \x1b[35m${error.message}\x1b[0m`,
            );
        }
    }

    requestLatestVersion();
}
