<template>
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
        <div
            class="vitality-health absolute bottom-0 left-0 h-full w-[5px] bg-red-500"
            :style="{ height: `${health / 2}%` }"
        ></div>
    </div>
</template>

<script setup>
const { health } = defineProps(['health']);
</script>

<style lang="scss" scoped></style>
