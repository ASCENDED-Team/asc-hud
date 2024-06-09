import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import './src/commands.js';

const Rebar = useRebar();
const api = Rebar.useApi();
