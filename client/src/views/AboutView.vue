<script setup lang="ts">
  const items = [
    {name: 'Shoes', cost: 30},
    {name: 'Belt', cost: 20},
    {name: 'Socks', cost: 10}
  ]

  const cart = [
    {name: 'Shoes', cost: 30},
    {name: 'Belt', cost: 20}
  ]

</script>


<template>
  <div class="about">
    <h1 class="title">This is an about page</h1>

    <ul>
      <li v-for="item in items" :key="item.name">
        <h3>{{item.name}}</h3> 
        <em>${{item.cost}}</em>
      </li>

    </ul>


  </div>
</template>

<style lang="scss">
  ul {
    display: flex;
    width: 200px;
    padding: 5px;
    margin: 5px;
  }

</style>
