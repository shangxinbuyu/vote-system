<template>
  <div class="container">
    <Title/>
    <div class="vote-list">
      <div v-for="vote in voteList" :key="vote.id" class="item">
        <Item :item="vote" :list></Item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="VoteList" setup>
import {onMounted} from "vue";
import Item from './item/Index.vue'
import Title from './title/Index.vue'
import useVoteStore from "@/store/modules/Vote.ts";

let {voteList, list} = useVoteStore()

onMounted(async () => {
  await list()
})
</script>

<style lang="scss" scoped>
@use '@/styles/variable.scss' as *;

.container {
  height: 100%;
  //min-height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;


  .vote-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;

    .item {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    }
  }
}
</style>