<template>
  <div class="week01">

    <!-- carousel -->
    <b-carousel
      v-model="type"
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      :interval=0
      img-height="360"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="(n, index) in backgrounds" :key="index">
        <template v-slot:img>
          <img class="d-block" height="360" :src=n.src>
        </template>
      </b-carousel-slide>

      <div class="carousel-content w-100">
        <div style="margin: 7rem;">
          <h1 class="mx-5">景點</h1>
          <b-row class="mx-5 type-button">
            <b-button class="mx-2" pill @click="clickTypeButton(0)" :variant="this.typeButton(0)">景點<b-icon class="ml-2" icon="camera-fill"></b-icon></b-button>
            <b-button class="mx-2" pill @click="clickTypeButton(1)" :variant="this.typeButton(1)">餐飲<b-icon class="ml-2" icon="geo-alt-fill"></b-icon></b-button>
            <b-button class="mx-2" pill @click="clickTypeButton(2)" :variant="this.typeButton(2)">旅宿<b-icon class="ml-2" icon="house-fill"></b-icon></b-button>
            <b-button class="mx-2" pill @click="clickTypeButton(3)" :variant="this.typeButton(3)">活動<b-icon class="ml-2" icon="geo-alt-fill"></b-icon></b-button>
          </b-row>
          <b-row class="mx-4 mt-3 px-3">
            <b-col cols="5">
              <b-form-input list="cities" v-model="searchCity" size="lg" placeholder="輸入想去的地點"></b-form-input>
              
              <datalist id="cities">
                <option v-for="(city, index) in cities" :key="index">{{ city.value }}</option>
              </datalist>
            </b-col>
            <b-col cols="4">
              <b-form-input v-model="searchText" placeholder="輸入景點名稱" size="lg"></b-form-input>
            </b-col> 
            <b-col>
              <b-button @click="clickSearcButton" class="search-button px-4" variant="danger" size="lg"><b-icon class="mr-2" icon="search"></b-icon>搜尋</b-button>
            </b-col>
          </b-row>
        </div>
      </div>

    </b-carousel>
    <!-- carousel -->

    <!-- card -->
    <Card class="my-4" :itemsData="itemsData" :type="typeName" />
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
      typeName: "",
      name: ["ScenicSpot", "Restaurant", "Hotel", "Activity"],
      itemsData: [],
      backgrounds: [
        { src : require('@/assets/week01/01-background.png') },
        { src : require('@/assets/week01/02-background.png') },
        { src : require('@/assets/week01/03-background.png') },
        { src : require('@/assets/week01/04-background.png') }                
      ],
      cities: [
        { value: "臺北市", text: "臺北市" },
        { value: "新北市", text: "新北市" },
        { value: "桃園市", text: "桃園市" },
        { value: "臺中市", text: "臺中市" },
        { value: "臺南市", text: "臺南市" },
        { value: "高雄市", text: "高雄市" },
        { value: "新竹縣", text: "新竹縣" },
        { value: "苗栗縣", text: "苗栗縣" },
        { value: "彰化縣", text: "彰化縣" },
        { value: "南投縣", text: "南投縣" },
        { value: "雲林縣", text: "雲林縣" },
        { value: "嘉義縣", text: "嘉義縣" },
        { value: "屏東縣", text: "屏東縣" },
        { value: "宜蘭縣", text: "宜蘭縣" },
        { value: "花蓮縣", text: "花蓮縣" },
        { value: "臺東縣", text: "臺東縣" },
        { value: "澎湖縣", text: "澎湖縣" },
        { value: "金門縣", text: "金門縣" },
        { value: "連江縣", text: "連江縣" },
        { value: "基隆市", text: "基隆市" },
        { value: "新竹市", text: "新竹市" },
        { value: "嘉義市", text: "嘉義市" },
      ],
      searchCity: null,
      searchText: ""
    }
  },
  mounted () {
    this.getItems();
  },
  methods: {
    getItems() {
      this.typeName = this.name[this.type];
      let name = this.typeName;
      console.log(`${name}`);
      let api_url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism';
      let filter = 'Picture/PictureUrl1 ne null and Address ne null and City ne null'
      if (this.searchCity != null) {
        filter += ` and city eq '${this.searchCity}'`
      }
      console.log(filter);
      axios({
        methods: 'get',
        url: `${api_url}/${name}`,
        params: {
          // "$select": "name",
          "$filter": filter,
          "$top": 50,
        }
      })
      .then((resp) => {
        console.log(resp.data);
        this.itemsData = resp.data
      });
    },
    typeButton(type) {
      if (this.type === type) {
        return 'danger'
      } else {
        return 'light'
      }
    },
    clickTypeButton(type) {
      this.type = type;
      this.getItems();
    },
    onSlideEnd() {
      this.getItems();
    },
    clickSearcButton() {
      this.getItems();
      console.log(`${this.searchCity}`);
      console.log(`${this.searchText}`);
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

.carousel-content .type-button button {
  padding: 9px 18px !important;
  height: 40px !important;
  line-height: 22px !important;
  float: left;
}

.carousel-content .btn-light {
  color: #959595 !important;
}

.carousel-content .search-button {
  float: left;
}
</style>