import axios from 'axios'
import { PRODUCTS_PER_PAGE } from '../constants.js'

export default class Product {
  async getAll (page,
    sortBy = '',
    isDescending = false,
    filterOn = '',
    filterValue = '',
    limit = PRODUCTS_PER_PAGE) {
    const url = 'https://612535d93c91fb0017e729d5.mockapi.io/vehicles'
    let response
    const order = isDescending ? 'desc' : 'asc'

    if (!sortBy && !filterValue) {
      // если нет фильтрации и сортировки
      response = await axios.get(url, {
        params: {
          page,
          limit
        }
      })
    } else if (!sortBy && filterValue) {
    // есть фильтрация, но нет сортировки
      response = await axios.get(url, {
        params: {
          [filterOn]: filterValue
        }
      })
    } else if (!filterValue) {
    // есть сортировка, но нет фильтрации
      response = await axios.get(url, {
        params: {
          page,
          limit,
          sortBy,
          order
        }
      })
    } else {
    // есть и сортировка и фильтрация
      response = await axios.get(url, {
        params: {
          [filterOn]: filterValue,
          sortBy,
          order
        }
      })
    }
    return response.data
  }
}
