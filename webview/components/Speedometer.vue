<template>
    <div class="tacho absolute bottom-5 right-12 w-auto">
        <div
            class="tacho-wrapper relative h-[270px] w-[270px] rounded-full bg-gradient-to-t from-gray-500/20 to-transparent"
        >
            <TachoMeter :unitSpeed="getUnitAndSpeed(useKnots, vehicleClass, isMetric, speed)" />
            <Fuel :fuel="fuelPercentage" />
        </div>
        <Speed :unitSpeed="getUnitAndSpeed(useKnots, vehicleClass, isMetric, speed)" />
        <VehicleData
            :engineOn="engineOn"
            :locked="locked"
            :headlights="headlights"
            :highbeams="highbeams"
            :seatBelt="seatBelt"
        />
    </div>
</template>

<script setup lang="ts">
const events = useEvents();
import TachoMeter from './speedo/tachometer.vue';
import Fuel from './speedo/fuel.vue';
import Speed from './speedo/speed.vue';
import VehicleData from './speedo/vehicledata.vue';
import { useEvents } from '@Composables/useEvents';
import { ref, computed } from 'vue';
import { HUDEvents } from '@Plugins/asc-hud/shared/src/events';

const { speed, gear, maxGear, engineOn, locked, headlights, highbeams, isMetric, seatBelt, vehicleClass, useKnots } =
    defineProps([
        'speed',
        'gear',
        'maxGear',
        'engineOn',
        'locked',
        'headlights',
        'highbeams',
        'isMetric',
        'seatBelt',
        'vehicleClass',
        'useKnots',
    ]);

const fuelPercentage = ref(0);
events.on(HUDEvents.WebView.PUSH_FUEL, (value: number) => {
    fuelPercentage.value = value;
});

const unitOld = computed(() => {
    if (useKnots) {
        if (vehicleClass > 13 && vehicleClass < 17) {
            return 'KN';
        }
    }

    return isMetric ? 'KM/H' : 'Mph';
});

function getUnitAndSpeed(_useKnots: boolean, _vehicleClass: number, _isMetric: boolean, _speed: number) {
    let _unit;
    let _calcSpeed;

    if (useKnots) {
        if (_vehicleClass > 13 && _vehicleClass < 17) {
            _unit = 'KN';
        }
    }

    _unit = _isMetric ? 'KM/H' : 'Mph';

    switch (_unit) {
        case 'KM/H':
            _calcSpeed = speed * 3.6;
            break;
        case 'Mph':
            _calcSpeed = speed * 2.236936;
            break;
        case 'KN':
            _calcSpeed = speed * 1.943844;
            break;
        default:
            _calcSpeed = speed * 3.6;
            break;
    }

    return { unit: _unit, speed: _calcSpeed };
}

// function convertSpeed(speed: number) {
//     switch (unit.value) {
//         case 'KM/H':
//             return speed * 3.6;
//             break;
//         case 'Mph':
//             return speed * 2.236936;
//             break;
//         case 'KN':
//             return speed * 1.943844;
//             break;
//         default:
//             return speed * 3.6;
//             break;
//     }
//     // return isMetric ? speed * 3.6 : speed * 2.236936;
// }
</script>

<style></style>
