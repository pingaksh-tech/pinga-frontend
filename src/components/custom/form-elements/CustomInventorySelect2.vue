<template>
  <div class="custom__select center w-full">
    <VsSelect
      ref="selectBox"
      :typeable="autocomplete"
      :disabled="disabled"
      @clearValue="clearVal"
      @search-input="inputChanged"
      @scrollEnd="handleScrollEnd"
      class="w-full"
      :placeholder="placeholder"
      v-model="inputVal"
      :loader="processing || loading"
      :clearable="clearable"
      :multiple="multiple"
      :module_type="'inventory'"
    >
      <vs-select-item
        v-if="newLabel"
        :label="newLabel"
        :text="newLabel"
        value="newItemAddEvent"
        class="select-head-btn"
      />
      <vs-select-item
        v-for="(item, i) in vOptions"
        :key="i"
        :label="`${item.label} - ${item.category || ''}`"
        :text="getSelectItemText(item)"
        :value="item[val] || item['value']"
        class="select-item-with-avatar"
      />
      <div v-if="nodata && vOptions.length === 0" class="no-data-message" style="padding: 10px; text-align: center; color: #666;">
        No results found
      </div>
    </VsSelect>
  </div>
</template>

<script>
import VsSelect from '@/components/custom/form-elements/CustomSelect.vue'
import VsSelectItem from '@/components/custom/form-elements/vsSelectItem.vue'
import _ from 'lodash'

export default {
  name: 'CustomInventorySelect2',
  components: { VsSelect, VsSelectItem },
  props: {
    ssr: { type: Boolean, default: true },
    selectName: { type: String, default: null },
    options: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    extra: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: true },
    value: { default: null },
    val: { type: String, default: '_id' },
    action: { type: String, default: 'common/getInventories' },
    placeholder: { type: String, default: 'Select Inventory' },
    newLabel: { type: String, default: '' },
    label: { type: String, default: 'label' },
    autocomplete: { type: Boolean, default: true },
    searchFromStart: { type: Boolean, default: true },
    params: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    viewRendered: { type: Boolean, default: true }
  },
  data() {
    return {
      limit: 10,
      page: 1,
      search: '',
      total: 0,
      sso: [],
      processing: false,
      type: 'dropdown',
      nodata: false
    }
  },
  async mounted() {
    console.log('Component mounted, fetching initial options')
    this.sso = []
    await this.getOptions()
  },
  computed: {
    inputVal: {
      get() {
        if (this.multiple) {
          return this.vOptions
            .filter((value) => (this.value || []).includes(value[this.val] || value['value']))
            .map((item) => item[this.val] || item['value'])
        } else {
          const option = this.vOptions.find((item) => (item[this.val] || item['value']) === this.value)
          return option ? `${option.label} - ${option.category || ''}` : ''
        }
      },
      set(val) {
        if (val === 'newItemAddEvent') {
          this.$emit('addNew')
        } else {
          this.$emit('input', {
            ...this.vOptions.find((item) => val === (item[this.val] || item['value'])),
            value: val
          })
        }
      }
    },
    vOptions() {
      let options = [...this.extra, ...this.options, ...this.sso]
      if (this.autocomplete && this.searchFromStart && this.search) {
        options = options.filter((e) =>
          (e.label || '').toLowerCase().startsWith(this.search.toLowerCase())
        )
      }
      if (this.value) {
        const tIndex = options.findIndex((x) => (x[this.val] || x['value']) === this.value)
        if (tIndex > -1) {
          options = this.array_move(options, tIndex, 0)
        }
      }
      return options
    },
    array_move() {
      return (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
          let k = new_index - arr.length + 1
          while (k--) arr.push(undefined)
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
        return arr
      }
    }
  },
  methods: {
    getSelectItemText(item) {
      let content = `<div class="select-item-content" style="display: flex; align-items: center; gap: 12px; width: 100%;">`
      if (item.avatar) {
        content += `
          <div class="avatar-container" style="flex-shrink: 0;">
            <img src="${item.avatar}" alt="avatar"
                 style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #eee;"/>
          </div>`
      } else {
        content += `
          <div class="avatar-placeholder" style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%;
                background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
            <span style="color: #999; font-size: 16px;">${item.label ? item.label.charAt(0).toUpperCase() : '?'}</span>
          </div>`
      }
      content += `<div class="item-details" style="flex-grow: 1; min-width: 0;">`
      if (item.label) {
        content += `
          <div class="item-name" style="font-weight: 500; color: #333; white-space: nowrap;
               overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px;">
            ${item.label}
          </div>`
      }
      if (item.category) {
        content += `
          <div style="display: flex; gap: 8px; font-size: 12px; color: #666;">
            <span class="item-category" style="background: #f0f0f0; padding: 2px 6px;
                  border-radius: 4px; white-space: nowrap;">
              ${item.category}
            </span>
          </div>`
      }
      content += `</div></div>`
      return content
    },
    async handleScrollEnd() {
      console.log('Scroll end reached, page:', this.page)
      if (this.ssr && this.action && !this.processing && !this.nodata) {
        this.page += 1
        await this.getOptions(false)
      }
    },
    async getOptions(apiStat = true) {
      const payload = {
        search: this.search,
        page: this.page,
        limit: this.limit,
        type: this.type,
        ...this.params
      }
      console.log('getOptions called with payload:', payload)
      if (this.action && this.viewRendered) {
        this.processing = true
        try {
          const response = await this.$store.dispatch(this.action, payload)
          console.log('API response:', response)
          if (apiStat) {
            this.sso = []
          }
          if (!response || !response.data) {
            throw new Error('Invalid API response')
          }
          this.nodata = response.data.length < 1
          this.sso.push(...response.data)
          console.log('Updated sso:', this.sso)
        } catch (error) {
          console.error('Error in getOptions:', error)
          this.nodata = true
          this.sso = []
          this.$vs.notify({
            title: 'Error',
            text: 'Failed to load inventory options',
            color: 'danger',
            position: 'top-center',
            time: 5000
          })
        } finally {
          this.processing = false
        }
      } else {
        console.warn('Action or viewRendered not set:', { action: this.action, viewRendered: this.viewRendered })
      }
    },
    inputChanged(event) {
      const searchValue = event.target.value || ''
      if (this.search !== searchValue) {
        this.search = searchValue
        console.log('Search input changed:', this.search)
        this.page = 1
        this.$emit('search', this.search)
        this.getOptions(true)
      }
    },
    clearVal() {
      this.inputVal = this.multiple ? [] : null
      this.search = ''
      this.page = 1
      this.nodata = false
      this.getOptions(true)
    }
  },
  watch: {
    action() {
      console.log('Action changed, fetching options')
      this.getOptions()
    },
    viewRendered() {
      console.log('ViewRendered changed, fetching options')
      this.getOptions()
    }
  }
}
</script>

<style lang="scss">
.custom__select { position: relative; }
.select-item-with-avatar {
  padding: 10px 15px;
  transition: background-color 0.2s ease;
  &:hover { background-color: #f8f9fa; }
  .vs-select--item { border: none !important; padding: 0 !important; }
}
.select-head-btn {
  border-radius: 0.3rem;
  background-color: #0096dc;
  button {
    padding-left: 0.6rem;
    &:hover { border-radius: 0.3rem; background-color: #0096dc; }
    &::before {
      content: '+';
      color: #fff;
      font-size: 1.4rem;
      line-height: 0.8;
      margin-right: 0.4rem;
    }
    span { color: #fff; }
  }
}
.spinner_circle {
  width: 20px;
  height: 20px;
  background-color: #0096dc;
  border-radius: 50%;
  animation: animate 1s infinite;
  transition: 0.5s;
  @keyframes animate {
    0% { opacity: 0.1; transform: scale(0.2); }
    100% { opacity: 1; transform: scale(1); }
  }
}
.no-data-message {
  font-size: 14px;
  color: #666;
}
</style>