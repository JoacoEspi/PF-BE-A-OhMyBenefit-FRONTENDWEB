<template>
  <div class="wrapper">

    <!-- Responsive navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-new">
      <div class="container px-5">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/">
                <a v-if="!userLoggedIn" class="nav-link active" aria-current="page" href="#!">Home</a>
            </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about">
                <a v-if="!userLoggedIn" class="nav-link" href="#!">Sobre Nosotros</a>
            </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/user/registry">
                <a v-if="!userLoggedIn" class="nav-link" href="#!">Registrarse</a>
            </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
     </div>

<RouterView/>
</template>


<script>
export default {
  data() {
    return {
      userLoggedIn: false, 
    };
  },
};
</script>



<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
