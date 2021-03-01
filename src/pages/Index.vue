<template>
  <Layout>

    <div>
      <div v-for="picture in $page.pictures.edges" :key="picture.node.id">
        <div class="image-container">
          <g-image :src="picture.node.url" />
        </div>
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

.image-container {
  padding: 10px;
  width: 100%;
  height: 80vh;
  margin: auto;
}

.image-container img {
  height: 100%;
  width: 100%;
  object-fit: contain
}
</style>
