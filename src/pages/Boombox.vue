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
          <label for="volume">VOL</label>

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
          <q-btn
            v-if="audioPlaying"
            @click="playMusic()"
            color="white"
            text-color="black"
          >
            <span>Pause</span>
          </q-btn>

          <q-btn
            v-if="!audioPlaying"
            @click="playMusic()"
            color="white"
            text-color="black"
          >
            <span>Play</span>
          </q-btn>
          <!-- <button data-playing="false" class="tape-controls-play" role="switch" aria-checked="false">
					<span>Play/Pause</span>
				</button> -->
        </section>
      </div>
    </div>

    <div class="source-parameters">
      <SourceParameters
        v-on:updateHRTFDistanceModel="onUpdateChangeHRTFDistanceModel"
        v-on:updateMaxDistance="onUpdateMaxDistance"
        v-on:updateRefDistance="onUpdateRefDistance"
        v-on:updateRollOffFactor="onUpdateRollOffFactor"
        v-on:updateMovingStep="onUpdateMovingStep"
        v-on:updateRotatingStep="onUpdateRotatingStep"
      />
    </div>

    <!-- boombox-body -->

    <div id="show position" aria-labelledby="move-boombox"></div>

    <div id="position-controls" aria-labelledby="get-position-boombox">
      <h3 id="get-position-boombox">Source and listener positions</h3>
      <section class="get-position_xy">
        <div class="row q-col-gutter-sm">
          <div class="column">
            <q-input
              standout
              v-model="pannerSettings.positionX"
              @change="updatePanner('X', pannerSettings.positionX)"
              label="Source X Position"
            ></q-input>
          </div>
          <div class="column">
            <q-input
              standout
              v-model="pannerSettings.positionY"
              @change="updatePanner('Y', pannerSettings.positionY)"
              label="Source Y Position"
            ></q-input>
          </div>
          <div class="column">
            <q-input
              standout
              v-model="pannerSettings.positionZ"
              @change="updatePanner('Z', pannerSettings.positionZ)"
              label="Source Z Position"
            ></q-input>
          </div>
        </div>

        <div id="listener-position" class="row q-col-gutter-sm">
          <div class="column">
            <q-input
              standout
              v-model="positionListener.X"
              @change="updateListener('X', positionListener.X)"
              label="Listener X Position"
            ></q-input>
          </div>
          <div class="column">
            <q-input
              standout
              v-model="positionListener.Y"
              @change="updateListener('Y', positionListener.Y)"
              label="Listener Y Position"
            ></q-input>
          </div>
          <div class="column">
            <q-input
              standout
              v-model="positionListener.Z"
              @change="updateListener('Z', positionListener.Z)"
              label="Listener Z Position"
            ></q-input>
          </div>
        </div>
      </section>
    </div>
    <div
      id="move-controls"
      class="row q-col-gutter-sm"
      aria-labelledby="move-boombox"
    >
      <div id="move-source">
        <h3 id="move-boombox">Move Boombox</h3>
        <div class="row q-col-gutter-sm">
          <div class="column">
            <q-btn
              @click="moveBoombox('left')"
              color="white"
              text-color="black"
            >
              <span>Left</span>
            </q-btn>
            <q-btn
              @click="moveBoombox('right')"
              color="white"
              text-color="black"
            >
              <span>Right</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn @click="moveBoombox('up')" color="white" text-color="black">
              <span>Up</span>
            </q-btn>
            <q-btn
              @click="moveBoombox('down')"
              color="white"
              text-color="black"
            >
              <span>Down</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="moveBoombox('backward')"
              color="white"
              text-color="black"
            >
              <span>Backward</span>
            </q-btn>
            <q-btn
              @click="moveBoombox('forward')"
              color="white"
              text-color="black"
            >
              <span>Forward</span>
            </q-btn>
          </div>
        </div>
      </div>
      <div id="move-listener">
        <h3 id="move-listener">Move Listener</h3>
        <div class="row q-col-gutter-sm">
          <div class="column">
            <q-btn
              @click="moveListener('left')"
              color="white"
              text-color="black"
            >
              <span>Left</span>
            </q-btn>
            <q-btn
              @click="moveListener('right')"
              color="white"
              text-color="black"
            >
              <span>Right</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn @click="moveListener('up')" color="white" text-color="black">
              <span>Up</span>
            </q-btn>
            <q-btn
              @click="moveListener('down')"
              color="white"
              text-color="black"
            >
              <span>Down</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="moveListener('backward')"
              color="white"
              text-color="black"
            >
              <span>Backward</span>
            </q-btn>
            <q-btn
              @click="moveListener('forward')"
              color="white"
              text-color="black"
            >
              <span>Forward</span>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div id="rotate-source">
        <h3>Source orientation</h3>
        <p>
          <b>X : </b>{{ orientationSourceRad.X }} <b>, Y : </b
          >{{ orientationSourceRad.Y }} <b>, Z : </b
          >{{ orientationSourceRad.Z }}
        </p>
        <div class="row q-col-gutter-sm">
          <div class="column">
            <q-btn
              @click="rotateSourceX('clockwise')"
              color="white"
              text-color="black"
            >
              <span>Clockwise X</span>
            </q-btn>
            <q-btn
              @click="rotateSourceX('anticlockwise')"
              color="white"
              text-color="black"
            >
              <span>Anticlockwise X</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="rotateSourceY('clockwise')"
              color="white"
              text-color="black"
            >
              <span>Clockwise Y</span>
            </q-btn>
            <q-btn
              @click="rotateSourceY('anticlockwise')"
              color="white"
              text-color="black"
            >
              <span>Anticlockwise Y</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="rotateSourceZ('clockwise')"
              color="white"
              text-color="black"
            >
              <span>Clockwise Z</span>
            </q-btn>
            <q-btn
              @click="rotateSourceX('anticlockwise')"
              color="white"
              text-color="black"
            >
              <span>Anticlockwise Z</span>
            </q-btn>
          </div>
        </div>
      </div>
      <div id="rotate-Listener">
        <h3>Listener orientation</h3>
        <p>
          <b>X : </b>{{ orientationListenerRad.forwardX }} <b>, Y : </b
          >{{ orientationListenerRad.forwardY }} <b>, Z : </b
          >{{ orientationListenerRad.forwardZ }}
        </p>
        <div class="row q-col-gutter-sm">
          <div class="column">
            <q-btn
              @click="rotateListenerX('clockwise')"
              color="white"
              text-color="black"
            >
              <span>Clockwise X</span>
            </q-btn>
            <q-btn
              @click="rotateListenerX('anticlockwise')"
              color="white"
              text-color="black"
            >
              <span>Anticlockwise X</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="rotateListenerY('clockwise')"
              color="white"
              text-color="black"
            >
              <span>Clockwise Y</span>
            </q-btn>
            <q-btn
              @click="rotateListenerY('anticlockwise')"
              color="white"
              text-color="black"
            >
              <span>Anticlockwise Y</span>
            </q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="rotateListenerZ('clockwise')"
              color="white"
              text-color="black"
            >
              <span>Clockwise Z</span>
            </q-btn>
            <q-btn
              @click="rotateListenerZ('anticlockwise')"
              color="white"
              text-color="black"
            >
              <span>Anticlockwise Z</span>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import SourceParameters from "src/components/SourceParameters.vue";
export default {
  name: "Boombox",
  data() {
    return {
      localisationCtx: null,
      audioCtx: null,
      audioPlaying: false,
      listener: null,
      track: null,
      gainNode: null,
      positionListener: { X: 0, Y: 0, Z: 0 },
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
        distanceModel: "linear",
        maxDistance: 10000,
        refDistance: 1,
        rollOff: 1,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        orientationX: 0,
        orientationY: 0,
        orientationZ: 1,
      },
      panner: null,
      movingStep: 10,
      rotatingStepDeg: 36,
    };
  },
  computed: {
    rotatingStepRad() {
      return (this.rotatingStepDeg * Math.PI) / 180;
    },
  },
  components: { SourceParameters },
  methods: {
    onUpdateChangeHRTFDistanceModel(model) {
      this.pannerSettings.distanceModel = model;
      this.panner.distanceModel = model;
      console.log("HRTF update");
      console.log(this.panner);
    },
    onUpdateMaxDistance(distance) {
      this.pannerSettings.maxDistance = distance;
      this.panner.maxDistance = distance;
      console.log("max dist update");
      console.log(this.panner);
    },
    onUpdateRefDistance(distance) {
      this.pannerSettings.refDistance = distance;
      this.panner.refDistance = distance;
      console.log("ref dist update");
      console.log(this.panner);
    },
    onUpdateRollOffFactor(factor) {
      this.pannerSettings.rollOff = factor;
      this.panner.rollOff = factor;
      console.log("roll off update");
      console.log(this.panner);
    },
    onUpdateMovingStep(step) {
      this.movingStep = step;
      console.log("Moving step update");
    },
    onUpdateRotatingStep(step) {
      this.rotatingStepDeg = step;
      console.log("Rotating step update");
    },
    error() {
      console.warn("ERROR(" + err.code + "): " + err.message);
    },
    init() {
      console.log("init method");

      if (this.listener.positionX) {
        this.listener.positionX.value = this.positionListener.X;
        this.listener.positionY.value = this.positionListener.Y;
        this.listener.positionZ.value = this.positionListener.Z;
      } else {
        console.log("else set Pos");
        this.listener.setPosition(
          this.positionListener.X,
          this.positionListener.Y,
          this.positionListener.Z
        );
      }

      this.listener.setOrientation(0, 0, -1, 0, 1, 0);
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

      // if (!("geolocation" in navigator)) {
      //   console.log("No Geolocation available");
      // } else {
      //   const options = {
      //     enableHighAccuracy: false,
      //     timeout: 5000,
      //   };
      //   navigator.geolocation.watchPosition(
      //     this.updateCartesianListenerPosition,
      //     this.error,
      //     options
      //   );
      // }
    },
    moveBoombox(direction) {
      //console.log(this.getDistanceSourceListener());
      const step = this.movingStep;
      let tempPannerSettings = { ...this.pannerSettings };

      switch (direction) {
        case "left":
          this.pannerSettings.positionX =
            parseFloat(this.pannerSettings.positionX) - step;
          break;

        case "up":
          this.pannerSettings.positionY =
            parseFloat(this.pannerSettings.positionY) + step;
          break;

        case "right":
          this.pannerSettings.positionX =
            parseFloat(this.pannerSettings.positionX) + step;

          break;

        case "down":
          this.pannerSettings.positionY =
            parseFloat(this.pannerSettings.positionY) - step;
          break;

        case "backward":
          this.pannerSettings.positionZ =
            parseFloat(this.pannerSettings.positionZ) - step;
          break;

        case "forward":
          this.pannerSettings.positionZ =
            parseFloat(this.pannerSettings.positionZ) + step;
          break;
      }
      if (this.getDistanceSourceListener() > this.pannerSettings.maxDistance) {
        console.log("Max Dist exceeded");
        this.pannerSettings = tempPannerSettings;
      } else {
        this.updatePanner();
      }
    },
    moveListener(direction) {
      //console.log(this.getDistanceSourceListener());
      const step = this.movingStep;
      let tempListenerPosition = { ...this.positionListener };

      switch (direction) {
        case "left":
          this.positionListener.X = parseFloat(this.positionListener.X) - step;
          break;

        case "up":
          this.positionListener.Y = parseFloat(this.positionListener.Y) + step;
          break;

        case "right":
          this.positionListener.X = parseFloat(this.positionListener.X) + step;
          break;

        case "down":
          this.positionListener.Y = parseFloat(this.positionListener.Y) - step;
          break;

        case "backward":
          this.positionListener.Z = parseFloat(this.positionListener.Z) - step;
          break;

        case "forward":
          this.positionListener.Z = parseFloat(this.positionListener.Z) + step;
          break;
      }
      if (this.getDistanceSourceListener() > this.pannerSettings.maxDistance) {
        console.log("Max Dist exceeded");
        this.positionListener = tempListenerPosition;
      } else {
        this.updateListener();
      }
    },
    getDistanceSourceListener(stepX = 0, stepY = 0, stepZ = 0) {
      var res = Math.sqrt(
        Math.pow(
          this.pannerSettings.positionX - this.positionListener.X + stepX,
          2
        ) +
          Math.pow(
            this.pannerSettings.positionY - this.positionListener.Y + stepY,
            2
          ) +
          Math.pow(
            this.pannerSettings.positionZ - this.positionListener.Z + stepZ,
            2
          )
      );
      if (res > this.pannerSettings.maxDistance) {
        console.log("Max Distance exceeded");
      }
      return res;
    },
    updatePanner() {
      console.log("updatePanner");
      this.panner.positionX.value = this.pannerSettings.positionX;
      this.panner.positionY.value = this.pannerSettings.positionY;
      this.panner.positionZ.value = this.pannerSettings.positionZ;
    },
    updateListener() {
      console.log("updateListener");
      this.listener.positionX.value = this.positionListener.X;
      this.listener.positionY.value = this.positionListener.Y;
      this.listener.positionZ.value = this.positionListener.Z;
    },
    async playMusic() {
      // console.log(this.$refs.audioPlayer);
      // console.log(this.audioCtx);
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.listener = this.audioCtx.listener;
        this.init();
      }
      //console.log(this.audioCtx);
      //console.log(this.$refs.audioPlayer.paused);

      if (this.audioCtx.state === "running") {
        this.$refs.audioPlayer.paused
          ? (this.$refs.audioPlayer.play(), (this.audioPlaying = true))
          : (this.$refs.audioPlayer.pause(), (this.audioPlaying = false));
      } else {
        console.error("audio context down");
      }

      // check if context is in suspended state (autoplay policy)
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    },
    //Clockwise from Y to Z
    rotateListenerX(direction) {
      const rotationAngle = this.rotatingStepRad; //tenth of a radian per rotation
      const orientationY = this.orientationListenerRad.forwardY;
      const orientationZ = this.orientationListenerRad.forwardZ;
      switch (direction) {
        case "clockwise":
          this.orientationListenerRad.forwardZ =
            orientationZ * Math.cos(rotationAngle) +
            orientationY * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationListenerRad.forwardY =
            orientationY * Math.cos(rotationAngle) -
            orientationZ * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationListenerRad.forwardZ =
            orientationZ * Math.cos(rotationAngle) -
            orientationY * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationListenerRad.forwardY =
            orientationY * Math.cos(rotationAngle) +
            orientationZ * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.listener.forwardY.value = this.orientationListenerRad.forwardY;
      this.listener.forwardZ.value = this.orientationListenerRad.forwardZ;
      console.log(this.listener);
    },
    // Clockwise from Z to X
    rotateListenerY(direction) {
      const rotationAngle = this.rotatingStepRad; //tenth of a radian per rotation
      const orientationX = this.orientationListenerRad.forwardX;
      const orientationZ = this.orientationListenerRad.forwardZ;
      switch (direction) {
        case "clockwise":
          this.orientationListenerRad.forwardX =
            orientationX * Math.cos(rotationAngle) +
            orientationZ * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationListenerRad.forwardZ =
            orientationZ * Math.cos(rotationAngle) -
            orientationX * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationListenerRad.forwardX =
            orientationX * Math.cos(rotationAngle) -
            orientationZ * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationListenerRad.forwardZ =
            orientationZ * Math.cos(rotationAngle) +
            orientationX * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.listener.forwardX.value = this.orientationListenerRad.forwardX;
      this.listener.forwardZ.value = this.orientationListenerRad.forwardZ;
      console.log(this.listener);
    },
    // Clockwise from Y to X
    rotateListenerZ(direction) {
      const rotationAngle = this.rotatingStepRad; //tenth of a radian per rotation
      const orientationX = this.orientationListenerRad.forwardX;
      const orientationY = this.orientationListenerRad.forwardY;
      switch (direction) {
        case "clockwise":
          this.orientationListenerRad.forwardX =
            orientationX * Math.cos(rotationAngle) +
            orientationY * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationListenerRad.forwardY =
            orientationY * Math.cos(rotationAngle) -
            orientationX * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationListenerRad.forwardX =
            orientationX * Math.cos(rotationAngle) -
            orientationY * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationListenerRad.forwardY =
            orientationY * Math.cos(rotationAngle) +
            orientationX * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.listener.forwardX.value = this.orientationListenerRad.forwardX;
      this.listener.forwardY.value = this.orientationListenerRad.forwardY;
      console.log(this.listener);
    },

    // clockwise from Y to Z
    rotateSourceX(direction) {
      const rotationAngle = this.rotatingStepRad; //tenth of a radian per rotation
      const orientationY = this.orientationSourceRad.Y;
      const orientationZ = this.orientationSourceRad.Z;
      switch (direction) {
        case "clockwise":
          this.orientationSourceRad.Z =
            orientationZ * Math.cos(rotationAngle) +
            orientationY * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationSourceRad.Y =
            orientationY * Math.cos(rotationAngle) -
            orientationZ * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationSourceRad.Z =
            orientationZ * Math.cos(rotationAngle) -
            orientationY * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationSourceRad.Y =
            orientationY * Math.cos(rotationAngle) +
            orientationZ * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.panner.orientationY.value = this.orientationSourceRad.Y;
      this.panner.orientationZ.value = this.orientationSourceRad.Z;
      console.log(this.orientationSourceRad);
    },
    // clockwise from Z to X
    rotateSourceY(direction) {
      const rotationAngle = this.rotatingStepRad; //tenth of a radian per rotation
      const orientationX = this.orientationSourceRad.X;
      const orientationZ = this.orientationSourceRad.Z;
      switch (direction) {
        case "clockwise":
          this.orientationSourceRad.X =
            orientationX * Math.cos(rotationAngle) +
            orientationZ * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationSourceRad.Z =
            orientationZ * Math.cos(rotationAngle) -
            orientationX * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationSourceRad.X =
            orientationX * Math.cos(rotationAngle) -
            orientationZ * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationSourceRad.Z =
            orientationZ * Math.cos(rotationAngle) +
            orientationX * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.panner.orientationZ.value = this.orientationSourceRad.Z;
      this.panner.orientationX.value = this.orientationSourceRad.X;
      console.log(this.orientationSourceRad);
    },

    // clockwise from Y to X
    //
    rotateSourceZ(direction) {
      const rotationAngle = this.rotatingStepRad; //tenth of a radian per rotation
      const orientationX = this.orientationSourceRad.X;
      const orientationY = this.orientationSourceRad.Y;
      switch (direction) {
        case "clockwise":
          console.log("Spin Right");
          this.orientationSourceRad.X =
            orientationX * Math.cos(rotationAngle) +
            orientationY * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationSourceRad.Y =
            orientationY * Math.cos(rotationAngle) -
            orientationX * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationSourceRad.X =
            orientationX * Math.cos(rotationAngle) -
            orientationY * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationSourceRad.Y =
            orientationY * Math.cos(rotationAngle) +
            orientationX * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.panner.orientationY.value = this.orientationSourceRad.Y;
      this.panner.orientationX.value = this.orientationSourceRad.X;
      console.log(this.orientationSourceRad);
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },
};
</script>