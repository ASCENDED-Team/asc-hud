import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import './src/commands.js';
import { HudServerConfig } from './src/serverConfig.js';

const Rebar = useRebar();
const api = Rebar.useApi();

HudServerConfig.init();
