<template>
  <!-- card -->
    <b-row cols="1" cols-sm="2" cols-md="4">
      <b-col v-for="(item, index) in itemsData" :key="index" class="mb-4">
        <b-card no-body>
            <div class="image-box">
              <img style="width: 100%" :src='item["Picture"]["PictureUrl1"]'/>
            </div>
          <b-card-body style="border-radius 0.75rem;">
            <b-card-title>{{ item.Name }}</b-card-title>
            <b-card-sub-title>{{ item.City }}</b-card-sub-title>
            <b-card-text><b-badge v-for="n in 3" :key="n" variant="secondary" class="mr-1">{{ item[`Class${n}`] }}</b-badge></b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  <!-- card -->
</template>
<script>
export default {
    data() {
      return {
      }
    },
    props: {
        itemsData: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.card {
  border-radius: 0.75rem;
  text-align: left;
  overflow: hidden;
  box-shadow: 0px 3px 6px #00000029;
}

.card .image-box {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card .image-box img {
  -webkit-transition:all .9s ease; 
  -moz-transition:all .9s ease; 
  -o-transition:all .9s ease;
  -ms-transition:all .9s ease; 
  width: 100%;
  height: 180px;
}

.card:hover {
  background: #fff;
  box-shadow: 0 6px 12px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.card:hover img {
  opacity: 0.8;
  -webkit-transform:scale(1.15);
  -moz-transform:scale(1.15);
  -ms-transform:scale(1.15);
  -o-transform:scale(1.15);
  transform:scale(1.15);
}

.card-title {
  font: normal normal normal 16px/21px Roboto;
}

.card-subtitle {
  font: normal normal normal 14px/19px Roboto;
}

.card-text {
  font: normal normal normal 14px/19px Roboto;
  color: #707070;
}
</style>