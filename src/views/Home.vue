<template>
  <div class="home">

    <b-container>
      <b-card>
        <b-img rounded="circle" badge-variant="info" alt="cat image" width="150" src="../assets/cat.jpg"></b-img>
        <h2 class="mt-3">Alan Liu</h2>
        <b-badge class="m-1" href="#">前端修練中</b-badge>
        <b-badge class="m-1" variant="success">VUE初心者</b-badge>
        <b-list-group class="mt-3">
          <b-list-group-item variant="light" href="#/Week01/">Week 1 - 台灣旅遊景點導覽</b-list-group-item>
          <b-list-group-item variant="light" href="#/Week02/">Week 2 - 自行車道地圖資訊整合網</b-list-group-item>
          <b-list-group-item variant="light" disabled href="#/Week03/">Week 3 - 全台公車動態時刻查詢應用服務</b-list-group-item>
        </b-list-group>
      </b-card>
    </b-container>

  </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
.card {
  margin-top: 5rem !important;
  margin-top: 50px;
  width: 100%;
  min-width: 280px;
  max-width: 460px;
  margin: auto;
  background-color: #f0f0f0;
}

.list-group-item {
  text-align: left;
  /* background-color: #f6f6f6; */
}
</style>
