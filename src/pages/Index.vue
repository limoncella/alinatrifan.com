<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <h1>Hello, willo!</h1>

    <div>
      <div v-for="picture in $page.pictures.edges" :key="picture.node.id">
        <g-image :src="picture.node.url" />
      </div>
    </div>


  </Layout>
</template>

<page-query>
query {
  pictures: allPictures {
    edges {
      node {
        id
        url
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Portfolio'
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
