import { PRODUCTS_PER_PAGE } from '../constants.js'

export const state = () => ({
  products: [],
  count: null
})

export const mutations = {
  setProducts (state, products) {
    state.products = products
  },
  setCount (state, count) {
    state.count = count
  }
}

export const actions = {
  async getProducts ({ commit }, {
    page,
    sortBy = '',
    isDescending = false,
    filterOn = '',
    filterValue = '',
    limit = PRODUCTS_PER_PAGE
  }) {
    const url = 'https://612535d93c91fb0017e729d5.mockapi.io/vehicles'
    let response
    const order = isDescending ? 'desc' : 'asc'
    // если нет фильтрации и сортировки

    if (!sortBy && !filterValue) {
      response = await this.$axios.$get(url, {
        params: {
          page,
          limit
        }
      })
    } else if (!sortBy && filterValue) {
      // есть фильтрация, но нет сортировки
      response = await this.$axios.$get(url, {
        params: {
          [filterOn]: filterValue
        }
      })
    } else if (!filterValue) {
      // есть сортировка, но нет фильтрации
      response = await this.$axios.$get(url, {
        params: {
          page,
          limit,
          sortBy,
          order
        }
      })
    } else {
      // есть и сортировка и фильтрация
      response = await this.$axios.$get(url, {
        params: {
          [filterOn]: filterValue,
          sortBy,
          order
        }
      })
    }
    commit('setProducts', response.data)
    commit('setCount', response.count)
  }
}
