<template>
  <!-- card -->
    <b-row cols="1" cols-sm="2" cols-md="4">
      <b-col v-for="(item, index) in itemsData" :key="index" class="mb-4">
        <b-card no-body>
          <div class="background-position-center" :style="`height: 150px;background-image: url(${item.Picture.PictureUrl1});`">
          </div>
          <b-card-body>
            <b-card-title>{{ item.Name }}</b-card-title>
            <b-card-sub-title class="mb-2">{{ item.Name }}</b-card-sub-title>
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