<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0 p-2" to="/">
        Графики
      </router-link>
    </nav>
    <!--  -->
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/" class="nav-link active" href="#">
                  График с GraphQL <span class="sr-only">(тек)</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts"></script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
