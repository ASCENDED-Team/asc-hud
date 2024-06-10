<template>
    <div class="vitality-container ml-2 flex flex-col gap-2">
        <div class="health-wrapper vitals relative">
            <div
                class="vitality-health absolute left-[7px] flex h-full w-full items-center justify-center bg-gradient-to-r from-gray-500/70 to-transparent"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="white"
                        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
                    />
                </svg>
            </div>
            <div class="vitality-health absolute left-0 h-full w-[5px] bg-red-500"></div>
        </div>
        <div class="armour-wrapper vitals relative">
            <div
                class="vitality-shield absolute left-[7px] flex h-full w-full items-center justify-center bg-gradient-to-r from-gray-500/70 to-transparent"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="white"
                        d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22"
                    />
                </svg>
            </div>
            <div class="vitality-health absolute left-0 h-full w-[5px] bg-blue-500"></div>
        </div>
    </div>
</template>

<script setup></script>

<style>
.vitals {
    height: calc(1vh * 4);
    width: calc(1vh * 4);
}
</style>
