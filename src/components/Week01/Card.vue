<template>
  <!-- card -->
    <b-row cols="1" cols-md="2" cols-xl="4">
      <b-col v-for="(item, index) in itemsData" :key="index" class="mb-4">
        <b-card no-body>
          <router-link tag="div" :to=getUrl(item.Name)>
            <div class="image-box">
              <img style="width: 100%" :src='item["Picture"]["PictureUrl1"]'/>
              <!-- <b-button variant="light" pill size="sm"><b-icon icon="suit-heart"></b-icon></b-button>
              <b-button variant="light" pill size="sm"><b-icon icon="suit-heart-fill" variant="danger"></b-icon></b-button> -->
            </div>
            <b-card-body style="border-radius 0.75rem;">
              <b-card-title class="my-1 ">{{ item.Name }}</b-card-title>
              <b-card-sub-title class="my-2"><b-icon class="mx-1" icon="geo-alt-fill"></b-icon><u>{{ item.City }}</u></b-card-sub-title>
              <b-card-text>
                <b-badge v-if="item[`Class1`] == null" variant="secondary" class="m-1">未分類</b-badge>
                <b-badge v-for="n in 3" :key="n" variant="secondary" class="m-1">{{ item[`Class${n}`] }}</b-badge>
              </b-card-text>
            </b-card-body>
          </router-link>
        </b-card>
      </b-col>
    </b-row>
  <!-- card -->
</template>
<script>
export default {
  props: {
    itemsData: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    getUrl(name) {
      return `/${this.type}/${name}`
      // return `/week01/${this.type}/${name}`
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0.75rem;
  text-align: left;
  overflow: hidden;
  border:2px #ffffff00 solid;
  background-color: #F1F1F1;
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
  min-height: 100%;
  object-fit: cover;
}

.card .image-box button {
  position: absolute;
  right: 10px;
  top: 10px;
}

.card .card-body {
  padding: 0.75rem 1.25rem;
  min-height: 120px;
  background-color: #FFFFFF;
}

.card .card-body h6 {
  color: #007bff !important;
}

.card .card-body svg {
  margin-bottom: 5px;
  font-size: 15px;
}

.card .card-body span {
  padding: 8px 8px 6px 8px;
  font-size: 12px;
}

.card .card-body h4 {
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.btn-sm {
  padding: 0.31rem 0.5rem;
  font-size: 0.8rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.card:hover {
  border:2px red solid;
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

h6 {
  color: #2A48FF;
}
.badge {
  color: #707070;
}
</style>