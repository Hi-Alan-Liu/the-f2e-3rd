<template>
  <div class="week01">

    <!-- carousel -->
    <b-carousel
      v-model="type"
      id="carousel-fade"
      fade
      :interval=0
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="(n, index) in backgrounds" :key="index">
        <template v-slot:img>
          <img class="d-block" height="380" :src=n.src>
        </template>
      </b-carousel-slide>


        <div class="carousel-content">
          <h1 class="mx-3">景點</h1>
          <b-row class="mx-3 type-button">
            <b-button class="mx-2 mt-2" pill @click="clickTypeButton(0)" :variant="this.typeButton(0)">景點<b-icon class="ml-2" icon="camera-fill"></b-icon></b-button>
            <b-button class="mx-2 mt-2" pill @click="clickTypeButton(1)" :variant="this.typeButton(1)">餐飲<b-icon class="ml-2" icon="geo-alt-fill"></b-icon></b-button>
            <b-button class="mx-2 mt-2" pill @click="clickTypeButton(2)" :variant="this.typeButton(2)">旅宿<b-icon class="ml-2" icon="house-fill"></b-icon></b-button>
            <b-button class="mx-2 mt-2" pill @click="clickTypeButton(3)" :variant="this.typeButton(3)">活動<b-icon class="ml-2" icon="geo-alt-fill"></b-icon></b-button>
          </b-row>
          <div class="d-none d-lg-block">
            <b-row class="mt-3 px-4">
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

    <b-container>
      <div class="my-4 title">
        <h4>查詢結果</h4>
      </div>
      <!-- card -->
      <Card class="my-4" :itemsData="itemsData" :type="typeName" />
      <!-- card -->
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import JsSHA from 'jssha'
import Card from '@/components/Week01/Card.vue'
export default {
  data() {
    return {
      type: 0,
      typeName: "",
      name: ["ScenicSpot", "Restaurant", "Hotel", "Activity"],
      itemsData: [],
      backgrounds: [
        { src : require('@/assets/week01/ScenicSpot-background.png') },
        { src : require('@/assets/week01/Restaurant-background.png') },
        { src : require('@/assets/week01/Hotel-background.png') },
        { src : require('@/assets/week01/Activity-background.png') }                
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
      let api_url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism';
      let filter = 'Picture/PictureUrl1 ne null and Address ne null and City ne null'
      if (this.searchCity != null && this.searchCity != '') {
        filter += ` and city eq '${this.searchCity}'`
      }
      if (this.searchText != '') {
        filter += ` and contains(Name,'${this.searchText}')`
      }
      axios({
        methods: 'get',
        url: `${api_url}/${name}`,
        params: {
          "$filter": filter,
          "$top": 48,
        },
        headers: this.getAuthorizationHeader(),
      })
      .then((resp) => {
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
    },
    getAuthorizationHeader () {
      // API 驗證
      const AppID = "009d6fd80cce4642a061562712f36d99"
      const AppKey = "j-nAlULKegLcabqsPt-AYAQskw8"
      const GMTString = new Date().toGMTString()
      const ShaObj = new JsSHA('SHA-1', 'TEXT')
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
      return { Authorization: Authorization, 'X-Date': GMTString }
    },
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

.title {
  background-color: #2A48FF;
}

.title h4 {
  background-color: #F1F1F1;
  text-align: left;
  margin-left: 5px;
  padding-left: 5px;
  font-size: 20px;
  letter-spacing: 0.32px;
  color: #2C2C2C;
}

.carousel-item img{
  width: 100%;
  object-fit: cover !important;
  object-position: center center !important;
}

.carousel-content {
  margin-left: 10%;
  width: 75%;
  margin-top: 6rem;
  position: absolute;
  z-index: 1;
}

@media only screen and (min-width: 1400px) {
  .carousel-content {
    margin-left: 15rem;
    margin-top: 8rem;
    position: absolute;
  }
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