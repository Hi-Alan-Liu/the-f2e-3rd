<template>
  <div id="mapContainer">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        ref="markersRef"
        :lat-lng="marker.position"
      >
        <l-tooltip :content="marker.name" />
        <!-- l-popup :content="marker.name"/ -->
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";

export default {
  name: "LeafletMap",
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker,
    "l-tooltip": LTooltip,
  },
  data() {
    return {
      zoom: 16,
      center: { lat: 59.339025, lng: 18.065818 },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [
        { Id: 1, name: "Oslo", position: { lat: 22.6113513, lng: 120.3003869 } }
      ],
      markerObjects: null
    };
  },
  mounted() {
    this.test();

    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";
    this.$nextTick(() => {
      this.markerObjects = this.$refs.markersRef.map(ref => ref.mapObject);
    });
  },
  methods: {
    displayTooltip(selectedIndex) {
      for (let markerObject of this.markerObjects) {
        markerObject.closeTooltip();
      }
      this.markerObjects[selectedIndex].toggleTooltip();
    },
    test() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getPosition);
      } else {
        alert('GeoLocation not supported or not allowed');
      }
    },
    getPosition(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      this.center = { lat: lat, lng: lng}
      console.log(this.center);
    }
  }
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>