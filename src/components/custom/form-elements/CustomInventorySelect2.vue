<template lang="html">
 <div class="custom__select center w-full">
   <VsSelect
     ref="selectBox"
     :typeable="autocomplete"
     :disabled="disabled"
     @clearValue="clearVal"
     @input-change="inputChanged"
     class="w-full"
     :placeholder="placeholder"
     v-model="inputVal"
     @scrollEnd="handleScrollEnd"
     :loader="processing || loading"
     :clearable="clearable"
     :multiple="multiple"
     :module_type="'inventory'"
   >
     <vs-select-item v-if="newLabel" :text="newLabel"  :label="newLabel" value="newItemAddEvent" class="select-head-btn" />
     <vs-select-item
       v-for="(item, i) in vOptions"
       :key="i"
       :label="`${item.label}`"
       :text="getSelectItemText(item)"
       :value="item[val] || item['value']"
       class="select-item-with-avatar"
     >
       {{ item[val] || item['value'] }}
     </vs-select-item>
   </VsSelect>
 </div>
</template>

<script>
import VsSelect from '@/components/custom/form-elements/CustomSelect.vue'
import VsSelectItem from '@/components/custom/form-elements/vsSelectItem.vue'

export default {
 name: 'Select2',

 components: {
   VsSelect,
   VsSelectItem
 },

 props: {
   ssr: {
     type: Boolean,
     default: false
   },
   selectName: {
     type: String,
     default: null
   },
   options: {
     type: Array,
     default: () => []
   },
   disabled: {
     type: Boolean,
     default: false
   },
   extra: {
     type: Array,
     default: () => []
   },
   multiple: {
     type: Boolean,
     default: false
   },
   value: {
     default: null
   },
   val: {
     type: String,
     default: '_id'
   },
   action: {
     type: String,
     default: ''
   },
   placeholder: {
     type: String,
     default: ''
   },
   newLabel: {
     type: String,
     default: ''
   },
   label: {
     type: String,
     default: ''
   },
   autocomplete: {
     type: Boolean,
     default: true
   },
   searchFromStart: {
     type: Boolean,
     default: false
   },
   params: {
     type: Object,
     default: () => ({})
   },
   loading: {
     type: Boolean,
     default: false
   },
   clearable: {
     type: Boolean,
     default: true
   },
   viewRendered: {
     type: Boolean,
     default: true
   }
 },

 data() {
   return {
     limit: 5,
     page: 1,
     search: null,
     total: 0,
     sso: [],
     processing: false,
     type: 'dropdown',
     nodata: false
   }
 },

 async mounted() {
   this.sso = []
   await this.getOptions()
 },

 computed: {
   inputVal: {
     get() {
       if (this.multiple) {
        this.vOptions.filter((value) => {
         return this.value.includes(value.value || value['value'])
        })
         const filteredArray = this.vOptions
           .filter((value) => this.value.includes(value[this.val] || value['value']))
           .reduce((acc, item) => {
            console.log({acc,item})
             acc.push(item[this.val] || item['value'])
             return acc
           }, [])
         return filteredArray
       } else {
         const option = this.vOptions.find((item) => (item[this.val] || item['value']) === this.value)
         // return option ? option[this.val] || option['value'] : ''
         return option ? `${option.label} - ${option.category}` : '' // Just return the label text
       }
     },
     set(val) {
       if (val === 'newItemAddEvent') {
         this.$emit('addNew')
       } else {
         this.$emit('input', { ...this.vOptions.find((item) => val === (item[this.val] || item['value'])), value: val })
       }
     }
   },

   vOptions() {
     let options = [...this.extra, ...this.options, ...this.sso]
     if (this.autocomplete && this.searchFromStart) {
       options = options.filter((e) => {
         return !this.search || (e.label || '').toLowerCase().startsWith(this.search.toLowerCase())
         // return this.search ? (e.label || '').toLowerCase().search(this.search.toLowerCase()) > -1 : true
       })

       if (this.value) {
         const tIndex = options.findIndex((x) => (x[this.val] || x['value']) === this.value)
         if (tIndex > -1) {
           options = this.array_move(options, tIndex, 0)
         }
       }
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
         while (k--) {
           arr.push(undefined)
         }
       }
       arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
       return arr
     }
   }
 },

 methods: {
  getSelectItemText(item) {
      let content = `<div class="select-item-content" style="display: flex; align-items: center; gap: 12px; width: 100%;">`;

      // Starting section image (avatar)
      if (item.avatar) {
        content += `
          <div class="avatar-container" style="flex-shrink: 0;">
            <img src="${item.avatar}" alt="avatar"
                 style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #eee;"/>
          </div>`;
      } else {
        // Fallback avatar placeholder
        content += `
          <div class="avatar-placeholder" style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%;
                background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
            <span style="color: #999; font-size: 16px;">${item.label ? item.label.charAt(0).toUpperCase() : '?'}</span>
          </div>`;
      }

      // Main content section
      content += `<div class="item-details" style="flex-grow: 1; min-width: 0;">`;

      if (item.label) {
        content += `
          <div class="item-name" style="font-weight: 500; color: #333; white-space: nowrap;
               overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px;">
            ${item.label}
          </div>`;
      }

      if (item.sub_category || item.category) {
        content += `<div style="display: flex; gap: 8px; font-size: 12px; color: #666;">`;

        if (item.sub_category) {
          content += `
            <span class="item-sub-category" style="background: #f0f0f0; padding: 2px 6px;
                  border-radius: 4px; white-space: nowrap;">
              ${item.sub_category}
            </span>`;
        }

        if (item.category) {
          content += `
            <span class="item-category" style="background: #f0f0f0; padding: 2px 6px;
                  border-radius: 4px; white-space: nowrap;">
              ${item.category}
            </span>`;
        }

        content += `</div>`;
      }

      content += `</div></div>`; // Close item-details and select-item-content
      return content;
    },
   async handleScrollEnd() {
     this.$emit('scrollEnd')
     if (this.ssr && this.action && this.processing === false && !this.nodata) {
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

     if (this.action && this.viewRendered) {
       this.processing = true

       this.$store
         .dispatch(this.action, payload)
         .then((response) => {
           if (apiStat) {
             this.sso = []
           }

           this.nodata = response.data.length < 1
           this.sso.push(...response.data)
         })
         .catch(() => {})
         .finally(() => {
           this.processing = false
         })
     }
   },

   inputChanged(e) {
     this.search = e.target.value
     this.page = 1
     this.$emit('search', e.target.value || '')
     this.getOptions()
   },

   clearVal() {
     this.inputVal = this.multiple ? [] : null
     this.search = null
     this.page = 1
     this.getOptions()
   }
 },

 watch: {
   action() {
     this.getOptions()
   },

   viewRendered() {
     this.getOptions()
   }
 }
}
</script>

<style lang="scss">
.select-item-with-avatar {
  padding: 10px 15px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  .vs-select--item {
    border: none !important;
    padding: 0 !important;
  }

  .select-item-content {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .item-details {
    flex-grow: 1;
    min-width: 0;
  }

  .item-name {
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }

  .item-sub-category, .item-category {
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
  }

  .avatar-container img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #eee;
  }

  .avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 16px;
  }
}
</style>