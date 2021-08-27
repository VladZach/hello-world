<template>
  <div class="main">
    <Table
      :fields="fields"
      :table-data="products"
      :is-api-driven="true"
      :is-loading="isLoading"
      @filter-data="handleTableChange"
      @sort-data="handleTableChange"
      @page-change="handleTableChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

      fields: [
        { key: 'model', sortable: true, filterable: true },
        { key: 'color', sortable: true, filterable: true },
        { key: 'image', type: 'link' },
        { key: 'manufacturer', sortable: true, filterable: true },
        { key: 'price', sortable: true, filterable: true }
      ],
      isLoading: false
    }
  },
  async fetch () {
    this.isLoading = true
    await this.$store.dispatch('products/getProducts', {})
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
