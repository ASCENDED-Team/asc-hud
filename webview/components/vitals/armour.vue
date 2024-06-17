<template>
    <div class="armour-wrapper vitals relative">
        <div
            class="vitality-shield absolute left-[7px] flex h-full w-full items-center justify-center bg-gradient-to-r from-gray-500/70 to-transparent"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="white" d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
            </svg>
        </div>
        <div
            class="vitality-health absolute bottom-0 left-0 h-auto w-[5px] bg-blue-500"
            :style="{ height: `${armour}%` }"
        ></div>
    </div>
</template>

<script setup>
const { armour } = defineProps(['armour']);
</script>
