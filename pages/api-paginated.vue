<template>
  <div class="main">
    <Table
      :fields="fields"
      :per-page="perPage"
      :total-rows="count"
      :table-data="products"
      :is-api-driven="true"
      :is-loading="isLoading"
      @filter-data="handleTableChange"
      @sort-data="handleTableChange"
      @page-change="handleTableChange"
      @cell-button-click="handleClick"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { PRODUCTS_PER_PAGE } from '../constants.js'
export default {
  data () {
    return {
      perPage: PRODUCTS_PER_PAGE,
      fields: [
        { key: 'model', sortable: true, filterable: true },
        { key: 'color', sortable: true, filterable: true },
        { key: 'image', type: 'image' },
        { key: 'manufacturer', sortable: true, filterable: true },
        { key: 'price', sortable: true, filterable: true },
        { key: 'buy', type: 'button' }
      ],
      isLoading: false
    }
  },
  async fetch () {
    this.isLoading = true
    await this.$store.dispatch('products/getProducts', { page: 1 })
    this.isLoading = false
  },

  computed: {
    ...mapState('products', ['products', 'count'])
  },

  methods: {
    async handleTableChange (page, sortBy, isDescending, filterOn, filterValue) {
      this.isLoading = true
      await this.$store.dispatch('products/getProducts', { page, sortBy, isDescending, filterOn, filterValue })
      this.isLoading = false
    },
    // обработчик для клика по кнопке в таблице
    handleClick (e) {
      const classes = e.target.classList
      const isRed = e.target.classList.contains('btn-danger')
      if (isRed) {
        classes.remove('btn-danger')
        classes.add('btn-primary')
      } else {
        classes.remove('btn-primary')
        classes.add('btn-danger')
      }
    }
  }
}
</script>

<style scope>
  * {
    padding: 0;
    margin: 0;
  }
  .main {
    display: flex;
    justify-content: center;
  }
</style>
