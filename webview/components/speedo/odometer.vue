<template>
    <div
        class="tacho-odo absolute left-1/2 top-1/2 flex h-[132px] w-[208px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-end justify-end"
    >
        <h1 class="text-sm text-white">
            {{
                isMetric
                    ? `${parseFloat((milage / 1000).toFixed(1))} KM`
                    : `${parseFloat((milage * 0.000621371).toFixed(1))} M`
            }}
        </h1>
    </div>
</template>

<script setup>
const { milage, isMetric } = defineProps(['milage', 'isMetric']);
</script>

<style></style>
