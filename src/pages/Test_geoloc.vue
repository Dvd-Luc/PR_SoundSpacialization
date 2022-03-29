<template>
  <q-page>
    <q-input
      standout
      v-model="target.latitude"
      label="Source latitude"
    ></q-input>
    <q-input
      standout
      v-model="target.longitude"
      label="Source longitude"
    ></q-input>

    <q-btn @click="init()" color="white" text-color="black">
      <span>Test</span>
    </q-btn>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->

    <h4>
      Objectif Latitude : {{ target.latitude }} Longitude {{ target.longitude }}
    </h4>

    <h4>
      Point GPS numéro {{ iteration.index }} au temps {{ iteration.time }} :
      Latitude : {{ iteration.latitude }} Longitude : {{ iteration.longitude }}
    </h4>
    <Localisation />
  </q-page>
</template>

<script>
import Localisation from "src/components/Localisation";
// import { Vector } from "src/lib/Vector";
// import * as gpsMethods from "src/lib/gpsMethods";

export default {
  name: "Test_Geoloc",
  data() {
    return {
      iteration: { index: 0, time: null, latitude: null, longitude: null },
      id: null,
      target: { latitude: null, longitude: null },
      options: {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      },
    };
  },
  components: { Localisation },
  methods: {
    init() {
      this.id = navigator.geolocation.watchPosition(
        this.success,
        this.error,
        this.options
      );
    },
    success(pos) {
      var crd = pos.coords;

      this.iteration.index += 1;
      this.iteration.time = pos.timestamp;
      this.iteration.latitude = crd.latitude;
      this.iteration.longitude = crd.longitude;

      if (
        this.target.latitude === crd.latitude &&
        this.target.longitude === crd.longitude
      ) {
        console.log("Bravo, vous avez atteint la cible");
        navigator.geolocation.clearWatch(this.id);
      }
    },
    error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    },
  },
};
</script>