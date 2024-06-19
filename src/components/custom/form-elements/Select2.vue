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
    >
      <vs-select-item v-if="newLabel" :text="newLabel" value="newItemAddEvent" class="select-head-btn" />
      <vs-select-item :key="i" v-for="(item, i) in vOptions" :text="item[label] || item.label" :value="item[val] || item['value']" />
    </VsSelect>
    
  </div>
</template>

<script>
import VsSelect from '@/components/custom/form-elements/CustomSelect.vue'

export default {
  name: 'Select2',

  components: {
    VsSelect
  },

  props: {
    ssr: {
      type: Boolean,
      default: false
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
      default: 'id'
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
    }
  },

  data() {
    return {
      limit: 25,
      page: 1,
      search: null,
      total: 0,
      sso: [],
      processing: false,
      // type: 'dropdown',
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
          const filteredArray = this.vOptions
            .filter((value) => this.value.includes(value[this.val] || value['value'])
            )
            .reduce((acc, item) => {
              acc.push(item[this.val] || item['value'])

              return acc
            }, [])

          return filteredArray
        } else {
          const option = this.vOptions.find(
            (item) => (item[this.val] || item['value']) === this.value
          )
          return option ? option[this.val] || option['value'] : ''
        }
      },
      set(val) {
        if (val === 'newItemAddEvent') {
          this.$emit('addNew')
        } else {
          this.$emit('input', {
            ...this.vOptions.find(
              (item) => val === (item[this.val] || item['value'])
            ),
            value: val
          })
        }
      }
    },

    vOptions() {
      let options = [...this.extra, ...this.options, ...this.sso]
      if (this.autocomplete && this.searchFromStart) {
        options = options.filter((e) => {
          return (
            !this.search ||
            (e.label || '').toLowerCase().startsWith(this.search.toLowerCase())
          )
        })

        if (this.value) {
          const tIndex = options.findIndex(
            (x) => (x[this.val] || x['value']) === this.value
          )
          if (tIndex > -1) {
            options = this.array_move(options, tIndex, 0)
          }
        }
      }

      if (this.value) {
        const tIndex = options.findIndex(
          (x) => (x[this.val] || x['value']) === this.value
        )
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
    async handleScrollEnd() {
      this.$emit('scrollEnd')
      if (
        this.ssr &&
        this.action &&
        this.processing === false &&
        !this.nodata
      ) {
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
      if (this.action) {
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
      this.getOptions()
    },

    clearVal() {
      this.inputVal = this.multiple ? [] : null
    }
  },

  watch: {
    action() {
      this.getOptions()
    }
  }
}
</script>

<style lang="scss">
.select-head-btn {
  border-radius: 0.3rem;
  background-color: #006622;

  button {
    padding-left: 0.6rem;

    &:hover {
      border-radius: 0.3rem;
      background-color: #006622;
    }

    &::before {
      content: "+";
      color: #fff;
      font-size: 1.4rem;
      line-height: 0.8;
      margin-right: 0.4rem;
    }

    span {
      color: #fff;
    }
  }
}

.spinner_circle {
  width: 20px;
  height: 20px;
  background-color: #006622;
  border-radius: 50%;
  animation: animate 1s infinite;
  transition: 0.5s;

  @keyframes animate {
    0% {
      opacity: 0.1;
      transform: scale(0.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
