<!-- =========================================================================================
    File Name: ItemListView.vue
    Description: Item Component - List VIew
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pingaksh
    Author URL: http://www.themeforest.net/user/Pingaksh
========================================================================================== -->

<template>
  <div class="items-grid-view vx-row match-height">
    <div class="vx-col lg:w-1/3 sm:w-1/2 w-full gap-5">
      <vx-card>
        <div class="item-img-container bg-white h-64 flex items-center justify-center mb-4 cursor-pointer" @click="navigate_to_detail_view">
          <img src="https://kisna.com/cdn/shop/products/KFLR10752-_3_720x.jpg?v=1680943428" height="200" width="200" alt="item.name" class="grid-view-img px-4" />
        </div>
        <div class="item-details px-4">
          <div class="flex justify-between items-center">
            <div class="text-warning border border-solid border-warning flex py-1 px-2 rounded">
              <span class="text-sm mr-1"> 4</span>
              <feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
            </div>
            <h6 class="font-bold">$ 250</h6>
          </div>

          <div class="my-4">
            <h6 class="truncate font-semibold mb-1 hover:text-primary cursor-pointer" @click="navigate_to_detail_view">RHODRI RING</h6>
            <p class="item-description truncate text-sm">This Product is not fussy, it goes with everything you ever pair it with,.</p>
          </div>
        </div>
      </vx-card>
      <vx-card>
        <div class="item-img-container bg-white h-64 flex items-center justify-center mb-4 cursor-pointer" @click="navigate_to_detail_view">
          <img src="https://kisna.com/cdn/shop/files/KFLR11423R_Y1_720x.jpg?v=1714390444" height="200" width="200" alt="item.name" class="grid-view-img px-4" />
        </div>
        <div class="item-details px-4">
          <div class="flex justify-between items-center">
            <div class="text-warning border border-solid border-warning flex py-1 px-2 rounded">
              <span class="text-sm mr-1"> 4</span>
              <feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
            </div>
            <h6 class="font-bold">$ 650</h6>
          </div>

          <div class="my-4">
            <h6 class="truncate font-semibold mb-1 hover:text-primary cursor-pointer" @click="navigate_to_detail_view">NINA RING</h6>
            <p class="item-description truncate text-sm">This Product is not fussy, it goes with everything you ever pair it with,.</p>
          </div>
        </div>
      </vx-card>
      <vx-card>
        <div class="item-img-container bg-white h-64 flex items-center justify-center mb-4 cursor-pointer" @click="navigate_to_detail_view">
          <img src="https://kisna.com/cdn/shop/files/W11011-Y-1_720x.jpg?v=1693460430" height="200" width="200" alt="item.name" class="grid-view-img px-4" />
        </div>
        <div class="item-details px-4">
          <!-- RATING & PRICE -->
          <div class="flex justify-between items-center">
            <div class="text-warning border border-solid border-warning flex py-1 px-2 rounded">
              <span class="text-sm mr-1"> 4</span>
              <feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
            </div>
            <h6 class="font-bold">$ 550</h6>
          </div>

          <!-- TITLE & DESCRIPTION -->
          <div class="my-4">
            <h6 class="truncate font-semibold mb-1 hover:text-primary cursor-pointer" @click="navigate_to_detail_view">NIKOLE RING</h6>
            <p class="item-description truncate text-sm">This Product is not fussy, it goes with everything you ever pair it with,.</p>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isInCart() {
      return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
    },
    isInWishList() {
      return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
    }
  },
  methods: {
    toggleItemInWishList(item) {
      this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    additemInCart(item) {
      this.$store.dispatch('eCommerce/additemInCart', item)
    },
    cartButtonClicked(item) {
      this.isInCart(item.objectID) ? this.$router.push('/apps/eCommerce/checkout').catch(() => {}) : this.additemInCart(item)
    },
    navigate_to_detail_view() {
      this.$router.push({ name: 'ecommerce-item-detail-view', params: { item_id: this.item.objectID } }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.list-view-item {
  .item-name,
  .item-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-name {
    -webkit-line-clamp: 2;
  }

  .item-description {
    -webkit-line-clamp: 5;
  }

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }
}
</style>
