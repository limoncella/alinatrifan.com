<template>
  <div class="layout">
    <header class="header">
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      <nav class="nav">
        <g-link class="nav__link" to="/">Portfolio</g-link>
        <g-link class="nav__link" to="/projects/">Projects</g-link>
        <g-link class="nav__link" to="/journal/">Journal</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header>
    <slot/>
    <footer class="mt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div class="mb-3">© Alina Trifan 2020</div>
          <div>Sheffield, UK</div>
          <div>at@alinatrifan.com</div>
        </div>
        <div>
          <div>Follow</div>
          <div>
            <ul>
              <li><g-link to="https://www.facebook.com/alinatrifan/">Facebook</g-link></li>
              <li><g-link to="https://www.instagram.com/_alinatrifan/">Instagram</g-link></li>
              <li><g-link to="https://twitter.com/_alinatrifan">Twitter</g-link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Jost:wght@200;400;500&display=swap'
      }
    ]
  }
}
</script>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  background-color: #fffafa;
  font-family: Jost, sans-serif;
}

.layout {
  margin: 10px;
  padding-left: 100px;
  padding-right: 100px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
  font-size: 18px;
}

.nav__link {
  margin-left: 20px;
  color: #220807;
  font-weight: 200;
}

footer {
  font-weight: 200;
  font-size: 18px;
}
</style>
