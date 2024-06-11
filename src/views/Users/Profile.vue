<template>
  <div id="page-user-view">
    <vx-card>
      <div slot="no-body" class="tabs-container px-6 pt-6 bg-color">
        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Information" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-information class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Change Password" icon-pack="feather" icon="icon-lock">
            <div class="tab-text">
              <user-password-change-tab class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserEditTabInformation from './components/UserEditTabInformation'
import UserPasswordChangeTab from './components/UserPasswordChangeTab'

export default {
  name: 'Profile',
  // Form Data
  data: () => ({
    activeTab: 0
  }),
  computed: {
    ...mapState('auth', { user_data: 'userInfo' }),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds'])
  },

  mounted() {},
  components: {
    UserEditTabInformation,
    UserPasswordChangeTab,
  }
}
</script>
<style lang="scss">
// .bg-color {
//   .activeChild {
//     span,
//     i {
//       color: #fff !important;
//     }
//     .vs-tabs--btn {
//       background-color: #ff0050 !important;
//       border-radius: 5px !important;
//       padding: 12px !important;
//     }
//   }
//   .line-vs-tabs {
//     display: none;
//   }
// }
</style>
