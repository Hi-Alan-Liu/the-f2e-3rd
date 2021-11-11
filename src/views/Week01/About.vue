<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  date() {
    return {
      itemData: ""
    }
  },
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
  mounted () {
    this.getItemInfo(this.type, this.name);
  },
  methods: {
    getItemInfo(type, name) {
      console.log(name);
      let api_url = 'https://ptx.transportdata.tw/MOTC/v2/Tourism';
      axios({
        methods: 'get',
        url: `${api_url}/${type}`,
        params: {
          // "$select": "name",
          "$filter": `Picture/PictureUrl1 ne null and Class1 ne null and City ne null and Address ne null and Phone ne null`,
          "$top": 1,
        }
      })
      .then((resp) => {
        console.log(resp.data);
      });
    }
  }
}
</script>