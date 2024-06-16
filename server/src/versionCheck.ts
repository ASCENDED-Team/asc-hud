import * as alt from 'alt-server';
import * as path from 'path';
import { ExecSyncOptionsWithStringEncoding, execSync } from 'child_process';

const enabled = true;
const currentVersion = 'v1.0';
const gitRepoUrl = 'https://github.com/ASCENDED-Team/asc-hud.git';
const plugin = '[Ascended-HUD]:';

function executeCommand(command: string, cwd?: string): string {
    try {
        const options: ExecSyncOptionsWithStringEncoding = { encoding: 'utf-8' };
        if (cwd) {
            options.cwd = cwd;
        }
        return execSync(command, options).toString().trim();
    } catch (error) {
        console.error(`Error executing command "${command}": ${error}`);
        return '';
    }
}

function getLatestCommitHash(repoUrl: string, cwd?: string): string {
    const command = `git ls-remote ${repoUrl} HEAD`;
    const output = executeCommand(command, cwd);
    const commitHash = output.split('\t')[0].trim();
    return commitHash;
}

function getLatestTag(repoPath: string): string {
    try {
        const command = `git describe --tags --abbrev=0`;
        const output = executeCommand(command, repoPath).trim();

        const tagParts = output.split('-');
        return tagParts[0];
    } catch (error) {
        console.error(`Error fetching latest tag from ${repoPath}: ${error}`);
        return '';
    }
}

function checkVersionAndUpdateMessage(repoUrl: string) {
    try {
        const submodulePath = path.join(process.cwd(), './src/plugins/asc-hud');

        const currentTag = getLatestTag(submodulePath);
        const latestCommitHash = getLatestCommitHash(repoUrl);

        if (currentTag === '') {
            alt.logWarning(`No annotated tags found in ${gitRepoUrl}`);
            return;
        }

        if (currentTag !== currentVersion) {
            const message = `${plugin} New version ${currentTag} is available. Current version: ${currentVersion}. Latest commit hash: ${latestCommitHash}`;
            alt.logWarning(message);
        } else {
            const message = `${plugin} You are using the latest version ${currentTag}. Current version: ${currentVersion}. Latest commit hash: ${latestCommitHash}`;
            alt.log(message);
        }
    } catch (error) {
        console.error(`Error checking version and updating message: ${error}`);
    }
}

if(enabled) {
    setTimeout(() => {
        checkVersionAndUpdateMessage(gitRepoUrl);
    }, 2000);
}
