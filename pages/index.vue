<template>
  <b-row align-v="center" class="main" align-h="center">
    <b-col lg="4" class="navigation">
      <nuxt-link to="/api-paginated">
        With pagination and API
      </nuxt-link>
      <nuxt-link to="/api-not-paginated">
        Without pagination but with API
      </nuxt-link>
      <nuxt-link to="/raw-data">
        Without API
      </nuxt-link>
      <nuxt-link to="/raw-data-paginated">
        Without API but with pagination
      </nuxt-link>
      <div />
    </b-col>
  </b-row>
</template>

<script>

export default {
}
</script>

<style scope>
  * {
    padding: 0;
    margin: 0;
  }
  .main {
    background-color: rgb(255, 253, 228);
    height: 100vh;
    max-width: 100vw;
  }
  .navigation {
    height: 40vh;
    padding: 3rem 1rem 1rem;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid gainsboro;
    border-radius: 10px;
    font-size: 1.1rem;

    box-shadow: 0 5px 10px 0 gainsboro;
  }

  .navigation>a {
    flex-basis: 100%;
    text-align: center;
    text-decoration: none;
    color: rgb(83, 160, 233);
  }
   .navigation>a:hover {
    color: rgb(124, 186, 245);
  }
</style>
