<template>
  <RouterView #="{ Component }">
    <Transition name="fade">
      <Component :is="Component"/>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>