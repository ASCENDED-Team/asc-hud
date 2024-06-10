<template>
    <div class="street-container mb-2 flex flex-row gap-2">
        <div class="direction-wrapper flex items-center justify-center bg-[var(--hud-color)] font-bold text-white">
            {{ direction }}
        </div>
        <div
            class="street-wrapper flex grow items-center gap-1 bg-gradient-to-r from-gray-500/70 to-transparent pl-2 text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                <path
                    fill="white"
                    d="M16 2A11.013 11.013 0 0 0 5 13a10.9 10.9 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.9 10.9 0 0 0 27 13A11.013 11.013 0 0 0 16 2m0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4"
                />
                <circle cx="16" cy="13" r="4" fill="none" />
            </svg>
            {{ street }}
        </div>
    </div>
</template>

<script setup>
const { direction, street } = defineProps(['direction', 'street']);
</script>

<style>
.direction-wrapper {
    height: calc(1vh * 4);
    width: calc(1vh * 4);
    filter: drop-shadow(0px 0px 10px var(--hud-color));
    -webkit-filter: drop-shadow(0px 0px 10px var(--hud-color));
    border: 1px solid rgb(107 114 128);
}
</style>
