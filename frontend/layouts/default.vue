<template>
  <div>
    <Navbar />
    <div class="col-8 m-auto pt-5">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import Navbar from "../components/navbar";
export default {
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
