<template>
    <div class="absolute right-5 top-5 flex flex-row-reverse items-center gap-6">
        <div class="hud-logo">
            <img src="../../images/logo.svg" class="h-9" alt="logo" />
        </div>
        <div class="hud-domain">
            <span class="text-xs font-bold text-slate-200">{{ domain }}</span>
            <div class="hud-date-time flex justify-end gap-1">
                <span class="text-xs text-slate-200">{{ time }}</span>
                <span class="text-xs text-slate-300">|</span>
                <span class="text-xs text-slate-200">{{ formattedDate }}</span>
            </div>
        </div>
        <div class="hud-onlineplayers flex flex-col items-end">
            <span class="text-xs font-bold text-slate-300">ONLINE</span>
            <span class="text-xs text-slate-200">{{ players }} / {{ HudConfig.maxPlayers }}</span>
        </div>
        <div class="hud-id flex flex-col items-end">
            <span class="text-xs font-bold text-slate-300">ID</span>
            <span class="text-xs text-slate-200">123</span>
        </div>
    </div>
</template>

<script setup>
import { HudConfig } from '@Plugins/asc-hud/shared/config';
import { defineProps, computed } from 'vue';

const { domain, players, time } = defineProps(['domain', 'players', 'time']);

const formattedDate = computed(() => {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }).replace(/\//g, '.');
});
</script>

<style></style>
