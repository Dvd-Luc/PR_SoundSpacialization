<template>
  <div id="app">
    <p>
      Let us locate you for better results...
      <button @click="locateMe">Get location</button>
      <button @click="orientateMe">Get Orientation</button>
    </p>

    <div v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="location">
      Your location data is {{ location.coords.latitude }},
      {{ location.coords.longitude }}
    </div>

    <div v-if="orientation">Your orientation data is {{ dispOrientation }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Localisation",
  data: function () {
    return {
      location: null,
      orientation: null,
      gettingLocation: false,
      errorStr: null,
    };
  },
  onMount: () => {
    console.log("huhuhuhu");
  },
  computed: {
    dispOrientation() {
      return this.orientation;
    },
  },
  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    async getOrientation() {
      return new Promise((resolve, reject) => {
        if (!window.DeviceOrientationEvent) {
          console.log("Orientation not available");
          reject(new Error("Orientation not available on this device"));
        }

        window.addEventListener("deviceorientation", (event) => {
          console.log(
            "z : " +
              event.alpha +
              "\n x : " +
              event.beta +
              "\n y : " +
              event.gamma +
              "\n abs" +
              event.absolute
          );
          this.orientation = Math.random();
        });
      }).bind(this);
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
      } catch (e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
    async orientateMe() {
      try {
        this.orientation = await this.getOrientation();
        console.log(this.orientation);
      } catch (e) {
        this.errorStr = e.message;
      }
      //orientateMe();
    },
    /*async getOrientation(){
            window.addEventListener('deviceorientation', function(event) {
                console.log("z : " + event.alpha + "\n x : " + event.beta + "\n y : " + event.gamma + "\n abs" + event.absolute);
                this.orientation = 35;
            });
        }*/
  },
});
</script>