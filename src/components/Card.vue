<template>
  <!-- card -->
    <b-row cols="1" cols-sm="2" cols-md="4">
      <b-col v-for="(item, index) in itemsData" :key="index">
          <b-card>
            <div>
              <img v-bind="mainProps" :src='item["Picture"]["PictureUrl1"]'/>
            </div>
            <b-card-text deck>
              {{ item["Name"] }}
            </b-card-text>
          </b-card>
      </b-col>
    </b-row>
  <!-- card -->
</template>
<script>
export default {
    data() {
      return {
        mainProps: {
          center: true,
          fluidGrow: true,
          blank: true,
          blankColor: '#bbb',
          style: "object-fit: cover;"
        }
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