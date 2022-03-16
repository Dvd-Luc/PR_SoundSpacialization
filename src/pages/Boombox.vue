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

          <q-btn @click="playMusic()" color="white" text-color="black">
            <span>Play/Pause</span>
          </q-btn>
          <!-- <button data-playing="false" class="tape-controls-play" role="switch" aria-checked="false">
					<span>Play/Pause</span>
				</button> -->
        </section>
      </div>
      <!--bb-front-->

      <div class="bb-top"></div>
      <div class="bb-right"></div>
      <div class="bb-bottom"></div>
      <div class="bb-left"></div>
      <div class="bb-back"></div>
    </div>
    <!-- boombox-body -->

    <div id="show position" aria-labelledby="move-boombox"></div>

    <div id="position-controls" aria-labelledby="get-position-boombox">
      <h3 id="get-position-boombox">Get Position</h3>
      <section class="get-position_xy">
        <div class="row q-col-gutter-sm">
          <div class="column">
            <q-input
              standout
              v-model="pannerSettings.positionX"
              @change="updatePanner('X', pannerSettings.positionX)"
              label="Source X Position"
            ></q-input>
            <div>
              Horizontal Bounds
              <li>{{ bounds.leftBound }}</li>
              <li>{{ bounds.rightBound }}</li>
            </div>
          </div>
          <div class="column">
            <q-input
              standout
              v-model="pannerSettings.positionY"
              @change="updatePanner('Y', pannerSettings.positionY)"
              label="Source Y Position"
            ></q-input>
            <div>
              Vertical Bounds
              <li>{{ bounds.bottomBound }}</li>
              <li>{{ bounds.topBound }}</li>
            </div>
          </div>
          <div class="column">
            <q-input
              standout
              v-model="pannerSettings.positionZ"
              @change="updatePanner('Z', pannerSettings.positionZ)"
              label="Source Z Position"
            ></q-input>
            <div>
              Depth Bounds
              <li>{{ bounds.backwardBound }}</li>
              <li>{{ bounds.forwardBound }}</li>
            </div>
          </div>
        </div>

        <div id="move-listener" class="row q-col-gutter-sm">
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
    <div id="move-controls" aria-labelledby="move-boombox">
      <h3 id="move-boombox">Move Boombox</h3>
      <div class="row q-col-gutter-sm">
        <div class="column">
          <q-btn @click="moveBoombox('left')" color="white" text-color="black">
            <span>Left</span>
          </q-btn>
          <q-btn @click="moveBoombox('right')" color="white" text-color="black">
            <span>Right</span>
          </q-btn>
        </div>
        <div class="column">
          <q-btn @click="moveBoombox('up')" color="white" text-color="black">
            <span>Up</span>
          </q-btn>
          <q-btn @click="moveBoombox('down')" color="white" text-color="black">
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

    <div id="rotate-source">
      <h3>Rotate Source</h3>
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

    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->

    <Localisation />
  </q-page>
</template>

<script>
import Localisation from "src/components/Localisation";

export default {
  name: "Boombox",
  data() {
    return {
      audioCtx: null,
      listener: null,
      track: null,
      gainNode: null,
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
        maxDistance: 10000,
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
      bounds: {
        topBound: window.innerHeight / 2,
        bottomBound: -window.innerHeight / 2,
        rightBound: window.innerWidth / 2,
        leftBound: -window.innerWidth / 2,
        forwardBound: 500,
        backwardBound: -500,
      },
    };
  },
  components: { Localisation },
  methods: {
    init() {
      console.log("init method");
      if (this.listener.positionX) {
        this.listener.positionX.value = this.position.X;
        this.listener.positionY.value = this.position.Y;
        this.listener.positionZ.value = this.position.Z - 12;
      } else {
        this.listener.setPosition(
          this.position.X,
          this.position.Y,
          this.position.Z - 12
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
    },
    moveBoombox(direction) {
      const horizontalStep =
        (this.bounds.rightBound - this.bounds.leftBound) / 100;
      const verticalStep =
        (this.bounds.topBound - this.bounds.bottomBound) / 100;
      const depthStep =
        (this.bounds.forwardBound - this.bounds.backwardBound) / 100;
      switch (direction) {
        case "left":
          if (this.panner.positionX.value > this.bounds.leftBound) {
            this.panner.positionX.value -= horizontalStep;
          }
          break;
        case "up":
          if (this.panner.positionY.value < this.bounds.topBound) {
            this.panner.positionY.value += verticalStep;
          }
          console.log(this.panner.positionY.value);
          break;
        case "right":
          if (this.panner.positionX.value < this.bounds.rightBound) {
            this.panner.positionX.value += horizontalStep;
          }
          break;
        case "down":
          if (this.panner.positionY.value > this.bounds.bottomBound) {
            this.panner.positionY.value -= verticalStep;
          }
          break;
        case "backward":
          if (this.panner.positionZ.value > this.bounds.backwardBound) {
            this.panner.positionZ.value -= depthStep;
          }
          break;
        case "forward":
          if (this.panner.positionZ.value < this.bounds.forwardBound) {
            this.panner.positionZ.value += depthStep;
          }
          break;
      }
    },
    // moveBoomboxAxis(axis, value) {
    //   if (!isNaN(value)) {
    //     switch (axis) {
    //       case "X":
    //         if (value <= bounds.rightBound && value >= bounds.leftBound) {
    //           panner.positionX.value = value;
    //         } else {
    //           panner.positionX.value =
    //             Math.abs(bounds.rightBound - value) >
    //             Math.abs(bounds.leftBound - value)
    //               ? bounds.leftBound
    //               : bounds.rightBound;
    //         }
    //         break;
    //       case "Y":
    //         if (value <= bounds.topBound && value >= bounds.bottomBound) {
    //           panner.positionY.value = value;
    //         } else {
    //           panner.positionY.value =
    //             Math.abs(bounds.topBound - value) >
    //             Math.abs(bounds.bottomBound - value)
    //               ? bounds.bottomBound
    //               : bounds.topBound;
    //         }
    //         break;
    //       case "Z":
    //         if (value <= bounds.forwardBound && value >= bounds.backwardBound) {
    //           panner.positionZ.value = value;
    //         } else {
    //           panner.positionZ.value =
    //             Math.abs(bounds.forwardBound - value) >
    //             Math.abs(bounds.backwardBound - value)
    //               ? bounds.backwardBound
    //               : bounds.forwardBound;
    //         }
    //         break;
    //     }
    //   } else {
    //     console.log("Not a number on axis " + axis);
    //   }
    // },
    updatePanner(axis, value) {
      console.log("updatePanner");
      console.log(this.position.X);
      console.log(axis);
      console.log(value);
      switch (axis) {
        case "X":
          this.panner.positionX.value = value;
          break;
        case "Y":
          this.panner.positionY.value = value;
          break;
        case "Z":
          this.panner.positionZ.value = value;
          break;
      }
      console.log(this.panner);
      console.log(this.listener);
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
      console.log(this.panner);
      console.log(this.listener);
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
    rotateListenerY(direction) {
      const rotationAngle = Math.PI / 10; //tenth of a radian per rotation
      switch (direction) {
        case "clockwise":
          break;
        case "anticlockwise":
          break;
      }
    },

    // clockwise from Y to Z
    rotateSourceX(direction) {
      const rotationAngle = Math.PI / 10; //tenth of a radian per rotation
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
      const rotationAngle = Math.PI / 10; //tenth of a radian per rotation
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

    // clockwise from X to Y
    //
    rotateSourceZ(direction) {
      const rotationAngle = Math.PI / 10; //tenth of a radian per rotation
      const orientationX = this.orientationSourceRad.X;
      const orientationY = this.orientationSourceRad.Y;
      switch (direction) {
        case "clockwise":
          console.log("Spin Right");
          this.orientationSourceRad.Y =
            orientationY * Math.cos(rotationAngle) +
            orientationX * Math.sin(rotationAngle); // cos(a-b) = cos(a)cos(b)+sin(a)sin(b)
          this.orientationSourceRad.X =
            orientationX * Math.cos(rotationAngle) -
            orientationY * Math.sin(rotationAngle); // sin(a-b) = sin(a)cos(b)-cos(a)sin(b)
          break;
        case "anticlockwise":
          this.orientationSourceRad.Y =
            orientationY * Math.cos(rotationAngle) -
            orientationX * Math.sin(rotationAngle); // cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
          this.orientationSourceRad.X =
            orientationX * Math.cos(rotationAngle) +
            orientationY * Math.sin(rotationAngle); // sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
          break;
      }
      this.panner.orientationY.value = this.orientationSourceRad.Y;
      this.panner.orientationX.value = this.orientationSourceRad.X;
      console.log(this.orientationSourceRad);
    },
  },
};

// BOOMBOX FUNCTIONALITY HERE ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2
const audioElement = document.querySelector("audio");

const playButton = document.querySelector(".tape-controls-play");
</script>