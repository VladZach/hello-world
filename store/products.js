import Product from '../api/product.js'

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
    sortBy,
    isDescending,
    filterOn,
    filterValue,
    limit
  }) {
    const product = new Product()
    const response = await product.getAll(page, sortBy, isDescending, filterOn, filterValue, limit)
    commit('setProducts', response.data)
    commit('setCount', response.count)
  }
}
