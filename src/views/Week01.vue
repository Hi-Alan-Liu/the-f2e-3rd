<template>
  <div class="about">

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