<template>
  <q-page>
    <div class="boombox-body">
      <div class="bb-front">
        <section class="master-controls">
          <input
            type="range"
            id="volume"
            class="control-volume"
            min="0"
            max="2"
            value="1"
            list="gain-vals"
            step="0.01"
            data-action="volume"
          />
          <datalist id="gain-vals">
            <option value="0" label="min"></option>
            <option value="2" label="max"></option>
          </datalist>
          <label for="volume">Volume</label>

          <!-- <input
            type="range"
            id="panner"
            class="control-panner"
            list="pan-vals"
            min="-1"
            max="1"
            value="0"
            step="0.01"
            data-action="panner"
          />
          <datalist id="pan-vals">
            <option value="-1" label="left"></option>
            <option value="1" label="right"></option>
          </datalist>
          <label for="panner">Pan</label>

          <button
            class="control-power"
            role="switch"
            aria-checked="false"
            data-power="on"
          >
            <span>On/Off</span>
          </button> -->
        </section>

        <section class="tape">
          <audio
            ref="audioPlayer"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
            crossorigin="anonymous"
          ></audio>
          <!-- <q-slider
            @change="updateGain()"
            :min="0"
            :max="2"
            label="Vol"
          ></q-slider> -->

          <q-btn @click="playMusic()" color="white" text-color="black">
            <span>Play/Pause the spacialized experience</span>
          </q-btn>
          <!-- <button data-playing="false" class="tape-controls-play" role="switch" aria-checked="false">
					<span>Play/Pause</span>
				</button> -->
        </section>
      </div>
    </div>
    <!-- boombox-body -->

    <div id="show position" aria-labelledby="move-boombox"></div>

    <div id="source-position" aria-labelledby="set-source-positions">
      <h3 id="set-source-position">Set GPS source position</h3>

      <div class="row q-col-gutter-sm">
        <div class="column">
          <q-input
            standout
            v-model="gpsSourceLocation.deg.latitude"
            @change="updateSourceLocationRad()"
            label="Source latitude"
          ></q-input>
        </div>
        <div class="column">
          <q-input
            standout
            v-model="gpsSourceLocation.deg.longitude"
            label="Source longitude"
          ></q-input>
        </div>
      </div>
    </div>

    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->

    <Localisation />
  </q-page>
</template>

<script>
import Localisation from "src/components/Localisation";
// import { Vector } from "src/lib/Vector";
// import * as gpsMethods from "src/lib/gpsMethods";

export default {
  name: "Spacialization",
  data() {
    return {
      gpsTracker: null,
      audioCtx: null,
      listener: null,
      track: null,
      gainNode: null,
      gpsListenerLocation: { deg: null, rad: null },
      gpsSourceLocation: {
        deg: { latitude: 0, longitude: 0 }, // 45.7703307 4.880336
        rad: { latitude: 0, longitude: 0 },
      },
      positionListener: { X: 0, Y: 0, Z: 0 },
      position: { X: 0, Y: 0, Z: 0 },
      orientationListenerRad: {
        forwardX: 0,
        forwardY: 0,
        forwardZ: 1,
        upX: 0,
        upY: 1,
        upZ: 0,
      },
      orientationSourceRad: { X: 0, Y: 0, Z: -1 },
      pannerSettings: {
        pannerModel: "HRTF",
        innerCone: 360,
        outerCone: 0,
        outerGain: 0,
        distanceModel: "inverse",
        maxDistance: 100,
        refDistance: 1,
        rollOff: 1,
        positionX: 0, //this.position.X, Il faut faire un computed
        positionY: 0, //this.position.Y,
        positionZ: 0, //this.position.Z,
        orientationX: 0,
        orientationY: 0,
        orientationZ: 1,
      },
      panner: null,
    };
  },
  components: { Localisation },
  methods: {
    error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    },
    init() {
      console.log("init method");
      //const vector = new Vector(1, 2, 3);
      //console.log(cube(3));
      //console.log(vector.x);
      console.log(
        this.getDistanceFromGPSinKm(45.7703307, 4.880336, 45.7867264, 4.8726016)
      );

      //   if (this.listener.positionX) {
      //     this.listener.positionX.value = this.position.X;
      //     this.listener.positionY.value = this.position.Y;
      //     this.listener.positionZ.value = this.position.Z - 12;
      //   } else {
      //     this.listener.setPosition(
      //       this.position.X,
      //       this.position.Y,
      //       this.position.Z - 12
      //     );
      //   }

      //   this.listener.setOrientation(0, 0, -1, 0, 1, 0);

      if (!("geolocation" in navigator)) {
        console.log("No Geolocation available");
      } else {
        //this.updateCartesianListenerPosition();

        const options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        };
        this.gpsTracker = navigator.geolocation.watchPosition(
          this.updateCartesianListenerPosition,
          this.error,
          options
        );
      }
      console.log(this.listener);

      // let's use the class method for creating our panner node and pass in all those parameters we've set.

      this.panner = new PannerNode(this.audioCtx, this.pannerSettings);
      console.log(this.panner);

      // volume ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 4
      // const gainNode = this.audioCtx.createGain();

      // const volumeControl = document.querySelector('[data-action="volume"]');
      // volumeControl.addEventListener(
      //   "input",
      //   function () {
      //     gainNode.gain.value = this.value;
      //   },
      //   false
      // );

      // const pannerOptions = { pan: 0 };
      // const stereoPanner = new StereoPannerNode(audioCtx, pannerOptions);
      // const pannerControl = document.querySelector('[data-action="panner"]');
      // pannerControl.addEventListener(
      //   "input",
      //   function () {
      //     stereoPanner.pan.value = this.value;
      //   },
      //   false
      // );

      // track
      //   .connect(gainNode)
      //   .connect(stereoPanner)
      //   .connect(panner)
      //   .connect(audioCtx.destination);

      // const powerButton = document.querySelector(".control-power");

      // powerButton.addEventListener(
      //   "click",
      //   function () {
      //     if (this.dataset.power === "on") {
      //       audioCtx.suspend();
      //       this.dataset.power = "off";
      //     } else if (this.dataset.power === "off") {
      //       audioCtx.resume();
      //       this.dataset.power = "on";
      //     }
      //     this.setAttribute("aria-checked", audioCtx.state ? "false" : "true");
      //     console.log(audioCtx.state);
      //   },
      //   false
      // );
      this.track = this.audioCtx.createMediaElementSource(
        this.$refs.audioPlayer
      );

      const gainNode = this.audioCtx.createGain();

      const volumeControl = document.querySelector('[data-action="volume"]');
      volumeControl.addEventListener(
        "input",
        function () {
          gainNode.gain.value = this.value;
        },
        false
      );

      this.track
        .connect(gainNode)
        //.connect(stereoPanner)
        .connect(this.panner)
        .connect(this.audioCtx.destination);
    },
    updateSourceLocationRad() {
      this.gpsSourceLocation.rad.latitude = this.deg2rad(
        this.gpsSourceLocation.deg.latitude
      );
      this.gpsSourceLocation.rad.longitude = this.deg2rad(
        this.gpsSourceLocation.deg.longitude
      );
    },
    updateListener(axis, value) {
      console.log("updateListener");
      console.log(axis);
      console.log(value);
      switch (axis) {
        case "X":
          this.listener.positionX.value = value;
          break;
        case "Y":
          this.listener.positionY.value = value;
          break;
        case "Z":
          this.listener.positionZ.value = value;
          break;
      }
      // console.log(this.panner);
      // console.log(this.listener);
    },
    async playMusic() {
      // console.log(this.$refs.audioPlayer);
      // console.log(this.audioCtx);
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        console.log(this.listener);
        this.audioCtx = new AudioContext();
        this.listener = this.audioCtx.listener;
        this.init();
      }
      //console.log(this.audioCtx);
      //console.log(this.$refs.audioPlayer.paused);

      if (this.audioCtx.state === "running") {
        this.$refs.audioPlayer.paused
          ? this.$refs.audioPlayer.play()
          : this.$refs.audioPlayer.pause();
      } else {
        console.error("audio context down");
      }

      // check if context is in suspended state (autoplay policy)
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    },
    getDistanceFromGPSinKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    updateListenerGeoloc(pos) {
      console.log(pos);
      var coordsGPSdeg = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      var coordsGPSrad = {
        latitude: this.deg2rad(coordsGPSdeg.latitude),
        longitude: this.deg2rad(coordsGPSdeg.longitude),
      };
      this.gpsListenerLocation.deg = coordsGPSdeg;
      this.gpsListenerLocation.rad = coordsGPSrad;
    },
    // async updateGPSListenerPosition() {
    //   return new Promise((resolve, reject) => {
    //     navigator.geolocation.getCurrentPosition(
    //       (pos) => {
    //         console.log("Pos : ");
    //         console.log(pos);
    //         var coordsGPSdeg = {
    //           latitude: pos.coords.latitude,
    //           longitude: pos.coords.longitude,
    //         };
    //         var coordsGPSrad = {
    //           latitude: this.deg2rad(coordsGPSdeg.latitude),
    //           longitude: this.deg2rad(coordsGPSdeg.longitude),
    //         };
    //         this.gpsListenerLocation.deg = coordsGPSdeg;
    //         this.gpsListenerLocation.rad = coordsGPSrad;
    //         // this.gpsListenerLocation.coords.latitude = this.deg2rad(
    //         //   this.gpsListenerLocation.coords.latitude
    //         // );
    //         // this.gpsListenerLocation.coords.longitude = this.deg2rad(
    //         //   this.gpsListenerLocation.coords.longitude
    //         // );
    //         resolve(pos);
    //       },
    //       (err) => {
    //         //this.error(err);
    //         reject(err);
    //       }
    //     );
    //   });
    // },
    updateCartesianListenerPosition(pos) {
      var R = 6371 * 1000; // Earth radius in m
      console.log("Avant appel fonction updateListenerGeoloc");
      console.log(pos);
      this.updateListenerGeoloc(pos);

      // TODO passer des degres en radians dans une fonction pour la source --> le faire dans le q-input
      var sourceLatitude = this.gpsSourceLocation.rad.latitude;
      var sourceLongitude = this.gpsSourceLocation.rad.longitude;
      var listenerLatitude = this.gpsListenerLocation.rad.latitude;
      var listenerLongitude = this.gpsListenerLocation.rad.longitude;

      var differenceCartesian = {
        X:
          R *
          (Math.cos(sourceLatitude) * Math.cos(sourceLongitude) -
            Math.cos(listenerLatitude) * Math.cos(listenerLongitude)),
        Y:
          R *
          (Math.cos(sourceLatitude) * Math.sin(sourceLongitude) -
            Math.cos(listenerLatitude) * Math.sin(listenerLongitude)),
        Z: R * (Math.sin(sourceLatitude) - Math.sin(listenerLatitude)),
      };

      // console.log("Difference GPS : ");
      // console.log(differenceGPS);

      console.log("Difference Cartesian : ");
      console.log(differenceCartesian);
      this.positionListener.X = differenceCartesian.X;
      this.updateListener("X", this.positionListener.X);
      this.positionListener.Y = differenceCartesian.Y;
      this.updateListener("Y", this.positionListener.Y);
      this.positionListener.Z = differenceCartesian.Z;
      this.updateListener("Z", this.positionListener.Z);

      console.log("Source GPS : ");
      console.log(this.gpsSourceLocation);
      console.log("Listener GPS : ");
      console.log(this.gpsListenerLocation);

      console.log("Difference Cartesian");
      console.log(differenceCartesian);
      console.log("Position Listener");
      console.log(this.positionListener);

      //setTimeout(this.updateCartesianListenerPosition(), 2000);
      this.updateCartesianListenerPosition();
    },
  },
};

// BOOMBOX FUNCTIONALITY HERE ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2
// const audioElement = document.querySelector("audio");

// const playButton = document.querySelector(".tape-controls-play");
</script>