<template>
  <div class="wrapper">
    <b-row class="controls">
      <b-col lg="1" class="my-1">
        <nuxt-link to="/">
          Back
        </nuxt-link>
      </b-col>
      <b-col lg="8">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <!-- во всех трёх вариантах взаимодейсвия (пагинация, сортировка, фильтрация)
            проверяем, получаем ли мы данные из апи. Если да - прикрепляем
             свои обработчики (через v-on с объектом) и выключаем стандартные функции бутстрапа.
             Если данные не из апи - наоборот.
             -->
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
              v-on="hasApi ? {input: handleFilter} : {}"
            />

            <b-input-group-append />
          </b-input-group>
        </b-form-group>
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-radio-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-radio
              v-for="field in fields.filter(item =>
                item.filterable)"
              :key="field.key"
              :value="field.key"
            >
              {{ field.key.slice(0, 1).toUpperCase() + field.key.slice(1) }}
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <b-col
        v-if="hasPagination && !filter"
        lg="3"
        class="table__pagination"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="my-table"
          v-on="hasApi ? {input: handlePaginationInput} : {}"
        />

        <p class="mt-1">
          Current Page: {{ currentPage }}
        </p>
      </b-col>
    </b-row>
    <b-table
      id="my-table"
      class="table"
      sticky-header="75vh"
      outlined
      hover
      :busy="isBusy"
      :filter-included-fields="hasApi ? null : [filterOn] "
      :filter="hasApi ? null : filter"
      :fields="fields"
      :per-page="hasApi ? null : perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items="data"
      :current-page="currentPage"
      :no-local-sorting="hasApi"
      v-on="hasApi ? {'sort-changed': handleSorting} : {}"
    >
      <template #cell()="cell">
        <img
          v-if="cell.field.type === 'image'"
          :src="cell.value"
        >
        <a
          v-else-if="cell.field.type === 'link'"
          :href="cell.value"
        >
          {{ cell.value }}
        </a>
        <button
          v-else-if="cell.field.type === 'button'"
          :key="'' + currentPage + cell.index"
          class="btn btn-primary"
          v-on="cell.field.callback ? {'click': handleCellButtonClick} : {}"
        >
          {{ cell.field.key }}
        </button>
        <span v-else-if="cell.field.type === 'date'">
          {{ formatDate(cell.value) }}
        </span>
        <span v-else>
          {{ cell.value }}
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
import { debounce, formatDate as getDate } from '../functions.js'
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableFields: {
      type: Array,
      required: true
    },
    rowsPerPage: {
      type: Number,
      default: null
    },
    totalRows: {
      type: Number,
      default: null
    },
    isApiDriven: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1,
      sortBy: this.tableFields.find(item => item.sortable).key,
      sortDesc: false,
      filter: '',
      filterOn: this.tableFields.find(item => item.filterable).key,
      hasPagination: !!this.rowsPerPage
    }
  },

  computed: {
    data () {
      return this.tableData
    },
    fields () {
      return this.tableFields
    },
    perPage () {
      return this.rowsPerPage
    },
    total () {
      return this.totalRows
    },
    hasApi () {
      return this.isApiDriven
    },
    isBusy () {
      return this.isLoading
    }
  },

  methods: {
    handlePaginationInput () {
      this.$emit('page-change', this.currentPage, this.sortBy, this.sortDesc, this.filterOn, this.filter)
    },
    handleSorting ({ currentPage, sortBy, sortDesc }) {
      const page = this.hasPagination ? currentPage : null
      this.$emit('sort-data', page, sortBy, sortDesc, this.filterOn, this.filter)
    },
    handleFilter () {
      const value = this.filter.trim()
      // если есть значение в поле фильтрации, подгружаем все данные по фильтру
      let page = null
      let limit = null
      this.currentPage = 1
      // если инпут очищен и есть пагинация, подгружаем первую страницу
      if (!value) {
        page = this.hasPagination ? 1 : null
        limit = this.perPage
      }
      const callback = () => this.$emit('filter-data', page, this.sortBy, this.sortDesc, this.filterOn, value, limit)
      debounce(callback, 500)
    },
    handleCellButtonClick (event) {
      this.$emit('cell-button-click', event)
    },
    formatDate (string) {
      return getDate(string)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    padding: 2rem 2rem;
    background-color: rgb(255, 253, 228);
    max-height: 100vh;
    width: 100%;
  }
  .table::-webkit-scrollbar {
    width: 7px;
  }
  .table::-webkit-scrollbar-thumb {
    background-color: gainsboro;
  }
  .controls {
    height: 15vh
  }
  a {
    flex-basis: 100%;
    text-align: center;
    text-decoration: none;
    color: rgb(72, 140, 204);
  }
  a:hover {
    color: rgb(124, 186, 245);
  }
  table.b-table[aria-busy='true'] {
    opacity: 0.6;
  }
  img {
    width: 100px;
    height: 100px
  }
</style>
