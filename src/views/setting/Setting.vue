<template>
    <div class="p-6 vx-row">
        <div class="vx-col p-6 w-1/2">
            <Policy />
        </div>
        <div class="vx-col p-6 w-1/2">
            <CustomerSupport />
        </div>

    </div>
</template>
<script>
import Policy from './Policy.vue';
import CustomerSupport from './CustomerSupport.vue';

export default {
    name: 'Setting',

    /** Components */
    components: {
        Policy,
        CustomerSupport
    },
}
</script>