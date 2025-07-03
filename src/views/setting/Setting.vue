<template>
    <div class="p-6 vx-row"  v-if="checkPermissionSlug(['settings_list'])">
        <div class="vx-col p-6 w-1/2" >
            <Policy />
        </div>
        <div class="vx-col p-6 w-1/2">
            <CustomerSupport />
        </div>

        <div class="vx-col p-6 w-1/2">
            <ProfileBannerImage />
        </div>
    </div>
</template>
<script>
import Policy from './Policy.vue';
import CustomerSupport from './CustomerSupport.vue';
import ProfileBannerImage from './ProfileBannerImage.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Setting',

    /** Components */
    components: {
        Policy,
        CustomerSupport,
        ProfileBannerImage
    },

    /** computed */
    computed: {
        ...mapGetters('auth', ['checkPermissionSlug']),
    },
}
</script>