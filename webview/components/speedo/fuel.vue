<template>
    <div class="tacho-fuel relative right-[-136px] top-[-15px] w-[150px]">
        <div class="tacho-fuel-bar">
            <svg viewBox="0 0 150.9 230.79" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="fuel-bar"
                    :style="{ 'stroke-dashoffset': fuelBar }"
                    class="stroke-[var(--hud-color)]"
                    stroke-width="8px"
                    d="m0,4c81.13,0,146.9,65.77,146.9,146.9,0,28.56-8.15,55.22-22.25,77.77"
                />
            </svg>
        </div>

        <div class="tacho-fuel-icon absolute right-5 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15">
                <path
                    fill="white"
                    d="M14 6v5.5a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 0 11.5 8H10V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9h1.5a.5.5 0 0 1 .5.5v2a1.5 1.5 0 0 0 3 0V5a1 1 0 0 0-1-1V2.49a.5.5 0 0 0-.5-.49a.51.51 0 0 0-.5.55V5a1 1 0 1 0 1-1zm-5 .5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5z"
                />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, toRefs, defineProps, onMounted } from 'vue';

const props = defineProps(['fuel']);
const { fuel } = toRefs(props);

const fuelBar = ref(calculateFuel());

function calculateFuel() {
    const maxFuel = 100;
    const minDisplayValue = -313;
    const maxDisplayValue = 0;
    const normalizedFuel = fuel.value / maxFuel;
    const calculatedFuel = minDisplayValue + normalizedFuel * (maxDisplayValue - minDisplayValue);

    return calculatedFuel;
}

watch(fuel, () => {
    fuelBar.value = calculateFuel();
});

onMounted(() => {
    fuelBar.value = calculateFuel();
})
</script>

<style>
#fuel-bar {
    stroke-dasharray: 313;
}
</style>
