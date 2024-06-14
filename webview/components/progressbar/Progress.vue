<template>
    <div>
        <svg viewBox="0 0 40 40" width="80" height="80">
            <!-- Background circle -->
            <circle cx="20" cy="20" r="16" fill="transparent" stroke="gray" stroke-width="3" />

            <!-- Progress circle -->
            <circle
                cx="20"
                cy="20"
                r="16"
                fill="transparent"
                stroke="#30efa6"
                stroke-width="3"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progressOffset"
                transform="rotate(-90 20 20)"
            />
            <text
                x="52%"
                y="52%"
                text-anchor="middle"
                alignment-baseline="middle"
                fill="#30efa6"
                font-size="8px"
                font-weight="bold"
            >
                {{ Math.round(percentage) }}%
            </text>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface Props {
    totalProgress: number;
    progressCount: number;
}

const props = defineProps<Props>();

const percentage = computed(() => (props.progressCount / props.totalProgress) * 100);

const circumference = computed(() => 2 * Math.PI * 16);

const progressOffset = computed(() => circumference.value * (1 - percentage.value / 100));
</script>

<style scoped>
circle {
    transition: stroke-dashoffset 0.3s ease;
}
</style>
