<template>
  <div class="main">
    <Table
      :fields="fields"
      :table-data="products"
      :per-page="5"
      :total-rows="products.length"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'id', sortable: true, filterable: true },
        { key: 'name', sortable: true, filterable: true },
        { key: 'avatar', type: 'link' },
        { key: 'createdAt', sortable: true, filterable: true, type: 'date' }

      ],
      products: [
        { createdAt: '2021-08-25T01:03:21.801Z', name: 'Crystal Schneider', avatar: 'https://cdn.fakercloud.com/avatars/okseanjay_128.jpg', id: '1' },
        { createdAt: '2021-08-25T03:14:50.223Z', name: 'Gabriel Howe III', avatar: 'https://cdn.fakercloud.com/avatars/kevinjohndayy_128.jpg', id: '2' },
        { createdAt: '2021-08-25T07:24:07.246Z', name: 'Colleen Wyman', avatar: 'https://cdn.fakercloud.com/avatars/calebogden_128.jpg', id: '3' },
        { createdAt: '2021-08-25T08:57:29.105Z', name: 'Benjamin Effertz', avatar: 'https://cdn.fakercloud.com/avatars/YoungCutlass_128.jpg', id: '4' },
        { createdAt: '2021-08-25T07:55:53.254Z', name: 'Gladys Muller MD', avatar: 'https://cdn.fakercloud.com/avatars/instalox_128.jpg', id: '5' },
        { createdAt: '2021-08-24T21:58:40.474Z', name: 'Lela Lowe', avatar: 'https://cdn.fakercloud.com/avatars/puzik_128.jpg', id: '6' },
        { createdAt: '2021-08-25T15:03:52.270Z', name: 'Kristina Oberbrunner', avatar: 'https://cdn.fakercloud.com/avatars/dawidwu_128.jpg', id: '7' },
        { createdAt: '2021-08-25T01:42:29.133Z', name: 'Jackie Lang', avatar: 'https://cdn.fakercloud.com/avatars/belyaev_rs_128.jpg', id: '8' },
        { createdAt: '2021-08-25T04:42:57.835Z', name: 'Ashley Leannon', avatar: 'https://cdn.fakercloud.com/avatars/_vojto_128.jpg', id: '9' },
        { createdAt: '2021-08-25T11:32:40.341Z', name: 'Natalie Koelpin II', avatar: 'https://cdn.fakercloud.com/avatars/vladarbatov_128.jpg', id: '10' },
        { createdAt: '2021-08-25T12:16:14.238Z', name: 'Gregg Simonis', avatar: 'https://cdn.fakercloud.com/avatars/abdulhyeuk_128.jpg', id: '11' }]
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
