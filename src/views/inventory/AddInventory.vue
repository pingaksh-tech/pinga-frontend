<template>
  <vs-card>
    <div class="vx-row pt-5 px-5">
      <div class="vx-col w-full px-8">
        <form method="POST" @submit.prevent="save_changes">
          <div class="vx-row">
            <!-- Inventory Name -->
            <div class="vx-col w-1/2 mb-2">
              <vs-input icon="icon icon-box" icon-pack="feather" class="w-full" v-validate="'required'" v-model="form.name" label="Inventory Name *" name="Inventory Name" id="Inventory Name" />
              <span class="text-danger text-sm" v-show="errors.has('Inventory Name')">{{ errors.first('Inventory Name') }}</span>
            </div>

            <!-- Category -->
            <div class="vx-col w-1/2 mb-2">
              <label class="vs-input--label">Category *</label>
              <select-2
                class="w-full category-input"
                name="Category"
                placeholder="Select Category"
                :value="form.category_id"
                @input="(item) => (form.category_id = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-model="categoryID"
                v-validate="'required'"
                action="common/getCategories"
              />
              <span class="text-danger text-sm" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>
            </div>

            <!-- Sub Category -->
            <div class="vx-col w-1/2 mb-2">
              <label class="vs-input--label">Sub Category *</label>
              <select-2
                class="w-full category-input"
                name="Sub Category"
                placeholder="Select Sub Category"
                :value="form.sub_category_id"
                v-model="subCategoryID"
                @input="(item) => (form.sub_category_id = item && item.value)"
                :options="SubCategoryList"
                action="common/getSubCategoryByCategoryId"
                :actionCallRemove="false"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-validate="'required'"
              />
              <span class="text-danger text-sm" v-show="errors.has('Sub Category')">{{ errors.first('Sub Category') }}</span>
            </div>

            <!-- Size -->
            <div class="vx-col w-1/2 mb-2">
              <label class="vs-input--label">Size</label>
              <select-2
                class="w-full category-input"
                name="Size"
                placeholder="Select Size"
                :value="form.size_id"
                v-model="sizeID"
                @input="(item) => (form.size_id = item && item.value)"
                :options="SizeList"
                autocomplete
                :ssr="true"
                :multiple="false"
              />
              <span class="text-danger text-sm" v-show="errors.has('Size')">{{ errors.first('Size') }}</span>
            </div>

            <!-- Inventory Metal -->
            <div class="vx-col w-1/2 mb-2">
              <label class="vs-input--label">Inventory Metal *</label>
              <select-2
                class="w-full metal-input"
                name="Metal"
                placeholder="Select Metal"
                :value="form.metal_id"
                @input="(item) => (form.metal_id = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                v-validate="'required'"
                action="common/getMetals"
              />
              <span class="text-danger text-sm" v-show="errors.has('Metal')">{{ errors.first('Metal') }}</span>
            </div>

            <!-- Metal Weight -->
            <div class="vx-col w-1/2 mb-2">
              <vs-input
                icon="icon icon-database"
                icon-pack="feather"
                class="w-full"
                type="number"
                v-validate="'required|decimal|min_value:0'"
                min="0"
                v-model="form.metal_weight"
                label="Metal Weight (in grams)*"
                name="Metal Weight"
                id="Metal Weight"
              />
              <span class="text-danger text-sm" v-show="errors.has('Metal Weight')">{{ errors.first('Metal Weight') }}</span>
            </div>

            <!-- Product Tag -->
            <div class="vx-col w-1/2 mb-2">
              <label class="vs-input--label">Product Tag</label>
              <select-2
                class="w-full category-input"
                name="Product Tag"
                placeholder="Select Product Tag"
                :value="form.product_tags"
                @input="(item) => (form.product_tags = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="true"
                action="common/getProductTags"
              />
              <span class="text-primary text-sm" v-show="errors.has('Product Tag')">{{ errors.first('Product Tag') }}</span>
            </div>

            <!-- Manufacturing Price -->
            <div class="vx-col w-1/2 mb-2">
              <vs-input
                icon="icon icon-box"
                icon-pack="feather"
                class="w-full"
                type="number"
                min="1"
                v-model="form.manufacturing_price"
                label="Manufacturing Price"
                name="Manufacturing Price"
                id="Manufacturing Price"
              />
              <!-- <span class="text-danger text-sm" v-show="errors.has('Manufacturing Price')">{{ errors.first('Manufacturing Price') }}</span> -->
            </div>

            <div class="vx-col w-1/2 mb-2">
              <div class="vx-row px-5">
                <!-- Inventory Gender -->
                <div class="mb-2 w-1/2">
                  <label class="vs-input--label">Inventory Gender *</label>
                  <div class="w-full mt-1">
                    <vs-radio v-validate="'required'" v-model="form.gender" name="Gender" vs-value="male" class="mr-4" vs-name="layout-type-male">MALE</vs-radio>
                    <vs-radio v-validate="'required'" v-model="form.gender" name="Gender" vs-value="female" class="mr-4" vs-name="layout-type-female">FEMALE</vs-radio>
                    <vs-radio v-validate="'required'" v-model="form.gender" name="Gender" vs-value="unisex" class="mr-4" vs-name="layout-type-unisex">UNISEX</vs-radio>
                  </div>
                  <span class="text-danger text-sm" v-show="errors.has('Gender')">{{ errors.first('Gender') }}</span>
                </div>
                <!-- Inventory In Stock -->
                <div class="mb-2 w-1/4">
                  <label class="vs-input--label pl-0">Inventory In Stock ?</label>
                  <div class="mt-1">
                    <vs-switch color="primary" v-model="form.in_stock">
                      <span slot="on">Yes</span>
                      <span slot="off">No</span>
                    </vs-switch>
                  </div>
                </div>

                <!-- Inventory In Stock -->
                <div class="mb-2 w-1/4">
                  <label class="vs-input--label pl-0">Wear It Item ?</label>
                  <div class="mt-1">
                    <vs-switch color="primary" v-model="form.wear_it_item">
                      <span slot="on">Yes</span>
                      <span slot="off">No</span>
                    </vs-switch>
                  </div>
                </div>
              </div>
            </div>
            <!-- Delivery -->
            <div class="vx-col w-1/2 mb-2">
              <vs-input icon="icon icon-box" icon-pack="feather" class="w-full" v-validate="'required'" v-model="form.delivery" label="Delivery *" name="Delivery" id="Delivery" />
              <span class="text-danger text-sm" v-show="errors.has('Delivery')">{{ errors.first('Delivery') }}</span>
            </div>

            <!-- Production Name -->
            <div class="vx-col w-1/2 mb-2">
              <vs-input
                icon="icon icon-box"
                icon-pack="feather"
                class="w-full"
                v-model="form.production_name"
                label="Production Name"
                name="Production Name"
                id="Production Name"
              />
            </div>

            <div class="vx-col w-1/2 mb-2">
             <vs-input
               icon="icon icon-box"
               icon-pack="feather"
               class="w-full"
               
               v-model="form.manufacturing_number"
               label="Manufacturing Number"
               name="Manufacturing Number"
               id="manufacturing_number"
             />
            
           </div>
           <div class="vx-col w-1/2 mb-2">
            <!-- Collection dropdown -->
            <label class="vs-input--label">Collection</label>
              <select-2
                class="w-full category-input"
                name="Collection"
                placeholder="Select Collection"
                :value="form.collection"
                @input="(item) => (form.collection = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="false"
                :options="collectionOption"
                data-vv-as="Inventory Type"
            />
          </div>

            <!-- Family Products -->
            <div class="vx-col w-1/2 mb-2">
              <label class="vs-input--label">Family Product</label>
              <select-2
                class="w-full category-input"
                name="Family Product"
                placeholder="Select Family Product"
                :value="form.family_products"
                @input="(item) => (form.family_products = item && item.value)"
                autocomplete
                :ssr="true"
                :multiple="true"
                action="common/getFamilyProducts"
              />
              <!-- <span class="text-primary text-sm" v-show="errors.has('Family Product')">{{ errors.first('Family Product') }}</span> -->
            </div>

            <div class="vx-col w-full">
              <label class="vs-input--label block">Inventory Images</label>
              <input
                type="file"
                class="border p-2 rounded w-full"
                name="inventory_images"
                ref="files"
                accept=".jpg, .png , .jpeg,.pdf"
                @change="handleFileUpload"
                style="border: 1px solid rgba(0, 0, 0, 0.2)"
                multiple
              />
              <span class="text-danger text-sm" v-show="errors.has('inventory_images')">{{ errors.first('inventory_images') }}</span>
              <div class="mt-5 grid grid-cols-4 gap-4">
                <div v-for="(image, index) in form.exist_inventory_images" :key="index" class="relative group">
                  <div class="h-64 w-full rounded-lg overflow-hidden mb-2">
                    <img :src="image" alt="Image Preview" class="object-cover h-full w-full" />
                    <div class="absolute top-0 right-0">
                      <vx-tooltip :text="`Remove`" class="cursor-pointer">
                        <div class="text-xl w-8 h-8 flex justify-center items-center bg-grey text-white rounded-full" @click="removeFile(image, 'edit')">&#x2715;</div>
                      </vx-tooltip>
                    </div>
                  </div>
                </div>
                <div v-for="(image, index) in preview_images" :key="index" class="relative group">
                  <div class="h-64 w-full rounded-lg overflow-hidden mb-2">
                    <img :src="image.src" alt="Image Preview" class="object-cover h-full w-full" />
                    <div class="absolute top-0 right-0">
                      <vx-tooltip :text="`Remove`" class="cursor-pointer">
                        <div class="text-xl w-8 h-8 flex justify-center items-center bg-grey text-white rounded-full" @click="removeFile(index, 'preview')">&#x2715;</div>
                      </vx-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Diamond Section -->
            <div class="w-full px-4 mt-4">
              <!-- Add Diamond -->
              <vs-button @click="addDiamond" class="mb-4">Add Diamond</vs-button>
              <div class="diamond-container">
                <div v-for="(diamond, index) in form.diamonds" :key="index" class="diamond-entry vx-row border-sky-500 border">
                  <div class="flex items-center mt-2">
                    <h4>{{ index + 1 }}</h4>
                  </div>
                  <!-- Diamond Clarity -->
                  <div class="vx-col w-1/5 mb-2">
                    <label class="vs-input--label">Diamond Clarity *</label>
                    <select-2
                      class="w-full category-input"
                      :name="'diamond_clarity_' + index"
                      v-validate="'required'"
                      placeholder="Select Diamond Clarity"
                      :options="DIAMOND_CLARITY"
                      autocomplete
                      :ssr="true"
                      :multiple="false"
                      :value="form.diamonds[index].diamond_clarity"
                      data-vv-as="Diamond Clarity"
                      @input="(item) => (form.diamonds[index].diamond_clarity = item && item.value)"
                    />
                    <span class="text-danger text-xs" v-show="errors.has(`diamond_clarity_${index}`)">{{ errors.first(`diamond_clarity_${index}`) }}</span>
                  </div>

                  <!-- Diamond Shape -->
                  <div class="vx-col w-1/5 mb-2">
                    <label class="vs-input--label">Diamond Shape *</label>
                    <select-2
                      class="w-full category-input"
                      :name="'diamond_shape_' + index"
                      v-validate="'required'"
                      placeholder="Select Diamond Shape"
                      :options="DIAMOND_SHAPES"
                      autocomplete
                      :ssr="true"
                      :multiple="false"
                      :value="form.diamonds[index].diamond_shape"
                      data-vv-as="Diamond Shape"
                      @input="(item) => (form.diamonds[index].diamond_shape = item && item.value)"
                    />
                    <span class="text-danger text-xs" v-show="errors.has(`diamond_shape_${index}`)">{{ errors.first(`diamond_shape_${index}`) }}</span>
                  </div>

                  <!-- Diamond Size -->
                  <div class="vx-col w-1/5 mb-2">
                    <label class="vs-input--label">Diamond Size *</label>
                    <select-2
                      class="w-full category-input"
                      :name="'diamond_size_' + index"
                      v-validate="'required'"
                      placeholder="Select Diamond Size"
                      :options="DIAMOND_SIZES"
                      autocomplete
                      :ssr="true"
                      :multiple="false"
                      :value="form.diamonds[index].diamond_size"
                      data-vv-as="Diamond Size"
                      @input="(item) => (form.diamonds[index].diamond_size = item && item.value)"
                    />

                    <span class="text-danger text-xs" v-show="errors.has(`diamond_size_${index}`)">{{ errors.first(`diamond_size_${index}`) }}</span>
                  </div>
                  <!-- Diamond Count -->
                  <div class="vx-col w-1/5 mb-2">
                    <vs-input
                      icon="icon icon-hash"
                      icon-pack="feather"
                      type="number"
                      v-validate="'required|decimal|min_value:1'"
                      data-vv-as="Diamond Count"
                      v-model="diamond.diamond_count"
                      label="Diamond Count *"
                      min="1"
                      :name="'diamond_count_' + index"
                      class="w-full"
                    />
                    <span class="text-danger text-xs" v-show="errors.has(`diamond_count_${index}`)">{{ errors.first(`diamond_count_${index}`) }}</span>
                  </div>

                  <!-- Remove Diamond -->
                  <div class="flex items-center">
                    <vx-tooltip :text="`Remove`">
                      <feather-icon @click="removeDiamond(index)" icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 text-danger cursor-pointer" />
                    </vx-tooltip>
                  </div>
                  <vs-divider></vs-divider>
                </div>
              </div>
            </div>
          </div>

          <!-- Save & Reset Button -->
          <div class="vx-row pt-5 px-5 text-center">
            <div class="vx-col w-full">
              <div class="items-center">
                <vs-button class="mr-2 vs-con-loading__container" id="create-inventory" @click="save_changes" :disabled="!validateForm"> {{ $route.params.id ? 'Update' : 'Add' }}</vs-button>
                <vs-button color="danger" class="text-left" @click="navigateToInventoryList">Cancel</vs-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </vs-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  /** Page Name */
  name: 'AddInventory',

  /** components */
  components: {
    Select2
  },

  /** data */
  data() {
    return {
      categoryID: null,
      subCategoryID: null,
      sizeID: null,
      SubCategoryList: [],
      DIAMOND_CLARITY: [],
      DIAMOND_SIZES: [],
      DIAMOND_SHAPES: [],
      SizeList: [],
      collectionOption: [],
      form: {
        name: null,
        category_id: null,
        sub_category_id: null,
        size_id: null,
        metal_id: null,
        metal_weight: null,
        gender: null,
        in_stock: false,
        wear_it_item: false,
        delivery: null,
        production_name: null,
        manufacturing_number: null,
        collection: null,
        product_tags: [],
        family_products: [],
        manufacturing_price: null,
        diamonds: [],
        inventory_images: [],
        exist_inventory_images: []
      },
      preview_images: []
    }
  },
  /** Mounted */
  async mounted() {
    this.fetchCollection()
    await this.diamondConstant()
    this.DIAMOND_CLARITY = Object.entries(this.diamondConstantList.DIAMOND_CLARITY).map(([value, label]) => ({ value: label, label }))
    this.DIAMOND_SHAPES = Object.entries(this.diamondConstantList.DIAMOND_SHAPES).map(([value, label]) => ({ value: label, label }))
    this.DIAMOND_SIZES = this.diamondConstantList.DIAMOND_SIZES.map((v) => ({ value: v._id, label: v.diamond_slieve_size }))
  },

  /** computed */
  computed: {
    ...mapState('inventory', ['createLoading']),
    ...mapState('common', ['diamondConstantList']),
    ...mapState('collection', ['CollectionRecords', 'subtotal', 'FilteredCount', 'listLoading']),


    validateForm() {
      return !this.errors.any()
    }
  },

  /** created */
  async created() {
    if (this.$route.params.id) {
      await this.$store.dispatch('inventory/getInvantoryById', this.$route.params.id).then(async (res) => {
        const data = res.data.data
        this.categoryID = data.category_id
        this.subCategoryID = data.sub_category_id
        this.sizeID = data.size
        this.initial_category_id = data.category_id
        this.initial_sub_category_id = data.sub_category_id

        /* form variable */
        this.form.name = data.name
        this.form.category_id = data.category_id
        this.form.metal_id = data.metal_id
        this.form.metal_weight = data.metal_weight
        this.form.gender = data.gender
        this.form.in_stock = data.in_stock
        this.form.wear_it_item = data.wear_it_item
        this.form.delivery = data.delivery
        this.form.production_name = data.production_name
        this.form.manufacturing_number = data.manufacturing_number
        this.form.collection = data.collection
        if (data.diamonds) {
          this.form.diamonds = data.diamonds.map((v) => {
            delete v._id
            delete v.total_price
            return v
          })
        }
        this.form.product_tags = data.product_tags
        this.form.family_products = data.family_products
        this.form.exist_inventory_images = data.inventory_images
        this.form.manufacturing_price = data.manufacturing_price
        const category = await this.getCategories({ page: 1, limit: 25, type: 'dropdown', categoryId: data.category_id })
        this.categoryList = category.data
        /** change sub category & size */
        if (this.form.category_id) {
          const sub_category = await this.getSubCategory({ categoryId: this.form.category_id, page: 1, limit: 25, type: 'dropdown', subCategoryId: data.sub_category_id })
          this.SubCategoryList = sub_category.data
          this.subCategoryID = data.sub_category_id
        }

        if (data.sub_category_id) {
          const size = await this.getSize(data.sub_category_id)
          this.SizeList = size.data
          this.sizeID = data.size
        }

        if (data.size) {
          this.form.size_id = data.size
        }
        this.form.sub_category_id = data.sub_category_id
      })
    }
  },

  /** methods */
  methods: {
    ...mapActions('inventory', {
      createInventory: 'createInventory',
      updateInventoryRecord: 'updateInventoryRecord'
    }),
     ...mapActions('collection', {
      getCollectionList: 'getCollectionList'
      // deleteCollectionRecord: 'deleteCollectionRecord'
    }),
    ...mapActions('common', {
      getSubCategory: 'getSubCategoryByCategoryId',
      getSize: 'getSizeBySubCategoryId',
      diamondConstant: 'diamondConstant',
      getCategories: 'getCategories'
    }),
    async fetchCollection() {
      try {
        // Replace with your actual API call to get categories
        const response = await this.$store.dispatch('common/getCollections', {
          page: 1,
          limit: 25,
          type: 'dropdown'
        })
        this.collectionOption = response.data
      } catch (error) {
        console.error('Error fetching collections:', error)
      }
    },
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        let response
        const data = new FormData()
        for (const key in this.form) {
          if (typeof this.form[key] == 'object') {
            if (key == 'diamonds') {
              this.form[key].map((item, index) => {
                for (const field in item) {
                  data.append(`${key}[${index}][${field}]`, item[field])
                }
              })
            } else {
              if (this.form[key]) {
                this.form[key].map((item) => {
                  data.append(key == 'inventory_images' ? key : key + '[]', item)
                })
              }
            }
          } else {
             if (key === 'manufacturing_price') {
                  data.append(key, this.form[key] === undefined ? '' : this.form[key])
            } else {
                 data.append(key, this.form[key])
              }
          }
        }
        if (this.$route.params.id) {
          response = await this.updateInventoryRecord({
            inventoryId: this.$route.params.id,
            data: data
          })
        } else {
          response = await this.createInventory(data)
        }
        this.$router.push({
          name: 'inventory-list'
        })
        this.$emit('update-data', true)
        this.$vs.notify({
          title: 'Success',
          text: response.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'success'
        })
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          position: 'top-center',
          time: 5000,
          color: 'primary'
        })
      }
    },
    /* -------------------------------------------------------------------------- */
    /*                         Get Category List By Inventory                         */
    /* -------------------------------------------------------------------------- */
    async fetchSubCategories() {
      const sub_category = await this.getSubCategory({ categoryId: this.categoryID.value, page: 1, limit: 25, type: 'dropdown' })
      this.SubCategoryList = sub_category.data
    },
    async fetchSizes() {
      const size = await this.getSize(this.subCategoryID.value)
      console.log('🚀 ~ fetchSizes ~ size:', size)
      this.SizeList = size.data
    },

    addDiamond() {
      this.form.diamonds.push({
        diamond_clarity: '',
        diamond_shape: '',
        diamond_size: '',
        diamond_count: 0
      })
    },

    removeDiamond(index) {
      this.form.diamonds.splice(index, 1)
    },

    /** navigate to inventoryList */
    navigateToInventoryList() {
      this.$router.push({ name: 'inventory-list' })
    },

    /** file upload  */
    handleFileUpload(e) {
      const files = Array.from(e.target.files) // Convert FileList to array

      // Validate and handle each file
      files.forEach((file) => {
        if (!file) {
          this.$vs.notify({
            title: 'Error',
            text: 'No file selected',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
            time: 5000,
            color: 'primary'
          })
          return
        }

        // Create a preview URL and add it to the array
        const previewURL = URL.createObjectURL(file)
        this.preview_images.push({ src: previewURL, file })
        this.form.inventory_images.push(file)
      })
    },

    /** remove file */
    removeFile(index, type) {
      if (type == 'preview') {
        // Revoke the object URL
        URL.revokeObjectURL(this.preview_images[index].src)

        // Remove the file from the arrays
        this.preview_images.splice(index, 1)
        this.form.inventory_images.splice(index, 1)
      } else {
        const exist_index = this.form.exist_inventory_images.findIndex((value) => index == value)
        if (exist_index != -1) {
          this.form.exist_inventory_images.splice(exist_index, 1)
        }
      }
    }
  },

  /** watch */
  watch: {
    createLoading() {
      if (this.createLoading) {
        this.$vs.loading({
          container: '#create-inventory',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#create-inventory > .con-vs-loading')
      }
    },
    categoryID(newValue) {
      this.SubCategoryList = []
      this.form.sub_category_id = null
      this.subCategoryID = null
      if (newValue && newValue.value) {
        this.fetchSubCategories()
      }
    },
    subCategoryID(newValue, oldValue) {
      this.form.size_id = null
      this.sizeID = null
      if (newValue && newValue.value) {
        this.fetchSizes()
      }
    }
  }
}
</script>
