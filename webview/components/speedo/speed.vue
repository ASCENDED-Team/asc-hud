<template>
    <div
        class="tacho-speed absolute left-1/2 top-1/2 flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-full border-4 border-slate-200/40"
    >
        <h1 class="text-4xl font-bold text-white">{{ speed }}</h1>
        <h2 v-if="isMetric" class="text-slate-200/40">Km/h</h2>
        <h2 v-else class="text-slate-200/40">Mph</h2>
    </div>
</template>

<script setup>
const { speed, isMetric } = defineProps(['speed', 'isMetric']);
</script>

<style></style>
