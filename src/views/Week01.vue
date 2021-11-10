<template>
  <div class="week01">

    <!-- carousel -->
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      :interval=500000
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

        <div class="carousel-content">
          <h1 class="mx-3">景點</h1>
          <b-button class="mx-1 px-3"  pill variant="danger">景點<b-icon class="ml-2" icon="camera-fill"></b-icon></b-button>
          <b-button class="mx-1 px-3"  pill variant="light">餐飲<b-icon class="ml-2" icon="geo-alt-fill"></b-icon></b-button>
          <b-button class="mx-1 px-3"  pill variant="light">旅宿<b-icon class="ml-2" icon="house-fill"></b-icon></b-button>
          <b-button class="mx-1 px-3"  pill variant="light">活動<b-icon class="ml-2" icon="geo-alt-fill"></b-icon></b-button>
        </div>
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

.carousel-content {
  position: absolute;
  z-index: 1;
  left: 10rem;
  top: 5rem;
}

.carousel-content h1{
  font: var(--unnamed-font-style-normal) normal bold 80px/106px var(--unnamed-font-family-roboto);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-ffffff);
  text-align: left;
  font: normal normal bold 80px/106px Roboto;
  color: #FFFFFF;
  text-shadow: 0px 3px 6px #00000029;
  line-height: 80px;
}

.carousel-content svg {
  font-size: 15px;
  margin-bottom: 5px;
}
</style>