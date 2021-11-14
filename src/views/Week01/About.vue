<template>
  <div class="about">


    <!-- carousel -->
    <b-carousel
      class="d-none d-lg-block"
      id="carousel-fade"
      fade
      :interval=0
    >

      <b-carousel-slide>
        <template v-slot:img>
          <img class="d-block" height="200" :src="img">
        </template>
      </b-carousel-slide>

      <div class="carousel-content w-100">
        <h1 class="mx-5">景點</h1>
      </div>

    </b-carousel>
    <!-- carousel -->
    <b-container>
      <b-row class="px-5 py-4" cols="1" cols-md="1" cols-lg="2">
        <b-col class="item">
          <img :src='item["Picture"]["PictureUrl1"]'/>
        </b-col>

        <b-col>
          <b-card v-if="item != null" :title="item.Name">
            
            <b-card-sub-title class="mt-4 map">
              <b-icon class="mr-2" icon="geo-alt-fill"></b-icon>
              <a :href="getMap(item.Address)" target="_blank"><u>{{ item.City }}</u></a>
            </b-card-sub-title>

            <b-card-sub-title class="mt-4"><b-icon class="mr-2" icon="tag"></b-icon>標籤</b-card-sub-title>
            <b-card-text class="pt-2 px-4">
              <b-badge v-if="item[`Class1`] == null" variant="secondary" class="m-1">未分類</b-badge>
              <b-badge v-for="n in 3" :key="n" variant="secondary" class="m-1">{{ item[`Class${n}`] }}</b-badge>
            </b-card-text>

            <b-card-sub-title class="mt-4"><b-icon class="mr-2" icon="clock"></b-icon>開放時間</b-card-sub-title>
            <b-card-text class="pt-2 px-4">{{ item.OpenTime }}</b-card-text>


            <b-card-sub-title class="mt-4"><b-icon class="mr-2" icon="file-earmark-medical"></b-icon>簡介</b-card-sub-title>
            <b-card-text class="pt-2 px-4">{{ item.Description }}</b-card-text>

            <b-row class="m-2 mt-4">
              <b-col class="px-1 my-1" cols="12" xl="5"><b-button block variant="outline-danger" size="lg" :href=getPhone(item.Phone)><b-icon class="mr-2 mb-1" icon="telephone-fill"></b-icon>{{ item.Phone }}</b-button></b-col>
              <b-col class="px-1 my-1" cols="12" xl="5"><b-button block :disabled=getWebsiteUrl(item.WebsiteUrl) variant="danger" size="lg" :href="item.WebsiteUrl" target="_blank">官方網站</b-button></b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import JsSHA from 'jssha'
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      item: null,
      img: require(`@/assets/week01/${this.type}-background.png`)
    }
  },
  mounted () {
    this.getItemInfo(this.type, this.name);
  },
  methods: {
    getItemInfo(type, name) {
      let api_url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism';
      let filter =  `Picture/PictureUrl1 ne null and Address ne null and City ne null and name eq '${name}'`;
      axios({
        methods: 'get',
        url: `${api_url}/${type}`,
        params: {
          "$filter": filter,
        },
        headers: this.getAuthorizationHeader(),
      })
      .then((resp) => {
        this.item = resp.data[0];
      });
    },
    getMap(address) {
      return `https://www.google.com/maps/place/${address}`
    },
    getPhone(phone) {
      return `tel:${phone}`
    },
    getWebsiteUrl(url) {
      if (url != null) {
        return false
      } else {
        return true
      }
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
  }
}
</script>

<style scoped>
.carousel-item img{
  width: 100%;
  object-fit: cover !important;
  object-position: center center !important;
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
  margin-top: 5rem;
  padding-left: 15%;
}

@media (max-width: 976px){
  .container {
    margin-top: 3rem;
  }
}

.item img {
  height: 100%;
  object-fit: cover;
  object-position: center center !important;
  width: 100%;
  border-radius: 0.75rem;
}

.card {
  border-radius: 0.75rem;
  text-align: left;
  overflow: hidden;
  border:2px #ffffff00 solid;
}

.card .card-title {
  font: var(--unnamed-font-style-normal) normal bold 24px/32px var(--unnamed-font-family-roboto);
  color: var(--unnamed-color-2c2c2c);
  font: normal normal bold 24px/32px Roboto;
  letter-spacing: 0.29px;
  color: #2C2C2C;
  opacity: 1;
}

.card-subtitle svg{
  color: #b72323;
  margin-bottom: 5px;
  font-size: 20px;
}

.card-subtitle {
  font-weight: bold;
  letter-spacing: 0.19px;
  color: #2C2C2C!important ;
  opacity: 1;
}

.card-text span{
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-roboto);
}

.card-text {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-roboto);
  color: var(--unnamed-color-2c2c2c);
  text-align: left;
  font: normal normal normal 14px/19px Roboto;
  letter-spacing: 0.17px;
  color: #2C2C2C;
  opacity: 1;
}

.btn {
  height: 55px;
  line-height: 45px;
  font-size: 16px;
  padding: 5px 25px;
}
</style>