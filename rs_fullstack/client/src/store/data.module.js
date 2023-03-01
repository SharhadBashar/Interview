import DataService from '@/services/data.service'

const initialState = { products: [] }

export const data = {
  namespaced: true,
  state: initialState,
  actions: {
    getProducts({ commit }) {
      return DataService.getProducts().then(
        (response) => {
          commit('addProducts', response.data)
          return Promise.resolve(response.data)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },
    updateProduct({ commit }, product) {
      return DataService.updateProduct(product).then(
        (response) => {
          commit('updateProduct', response.data)
          return Promise.resolve(response.data)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    addProduct({ commit }, product) {
      return DataService.addProduct(product).then(
        (response) => {
          commit('addProduct', response.data)
          return Promise.resolve(response.data)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },
    removeProduct({ commit }, productId) {
      return DataService.removeProduct(productId).then(
        (response) => {
          commit('removeProduct', productId)
          return Promise.resolve(response.data)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },
  },
  mutations: {
    addProducts(state, products) {
      //TODO
    },
    addProduct(state, product) {
      state.products.push(product)
    },
    updateProduct(state, product) {
      var index = state.products
        .map(function (product) {
          return product.id
        })
        .indexOf(product.id)
      state.products.splice(index, 1, product)
    },
    removeProduct(state, productId) {
      var removeIndex = state.products
        .map(function (product) {
          return product.id
        })
        .indexOf(productId)
      state.products.splice(removeIndex, 1)
    },
  },
}
