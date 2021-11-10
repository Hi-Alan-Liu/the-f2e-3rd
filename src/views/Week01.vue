<template>
  <div class="week01">

    <!-- carousel -->
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      :interval=50000
    >
      <b-carousel-slide
        img-src="../assets/week01/01-background.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="../assets/week01/02-background.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="../assets/week01/03-background.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="../assets/week01/04-background.png"
      ></b-carousel-slide>
    </b-carousel>
    <!-- carousel -->

    <!-- card -->
    <Card class="my-4" :itemsData="itemsData" />
    <!-- card -->

  </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Week01/Card.vue'
export default {
  data() {
    return {
      type: 0,
      name: ["ScenicSpot", "Restaurant", "Hotel", "Activity"],
      itemsData: [],
    }
  },
  mounted () {
    this.getItem(this.name[this.type]);
  },
  methods: {
    getItem(name) {
      console.log(`${name}`);
      let api_url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism';
      axios({
        methods: 'get',
        url: `${api_url}/${name}`,
        params: {
          // "$select": "name",
          "$filter": "Picture/PictureUrl1 ne null and Class1 ne null and City ne null and Address ne null and Phone ne null",
          "$top": 50,
        }
      })
      .then((resp) => {
        console.log(resp.data);
        this.itemsData = resp.data
      });

    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.week01 {
  min-height: 50rem;
}
</style>