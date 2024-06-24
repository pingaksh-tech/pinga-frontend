<template>
    <div class="p-6">
        <div class="vx-card p-6 w-1/3">
            <Policy />
        </div>
        <div class="vx-card p-6 w-1/3">
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