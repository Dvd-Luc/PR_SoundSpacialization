<template>
  <div id="source-parameters">
    <h3>Source Parameters</h3>
    <q-select
      standout
      v-model="selectedOption"
      @update:model-value="$emit('updateHRTFDistanceModel', selectedOption)"
      :options="HRTFOptions"
      label="HRTF Distance Model"
    ></q-select>
    <p>
      HRTF distance model is to be chosen between linear, inverse and
      exponential. Those models define the energetic behaviour of the acoustics
      of the experience
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distancemodel"
        >HRTF distance model documentation</a
      >
    </p>
    <q-input
      standout
      type="number"
      label="Max Distance (for linear model only)"
      v-model="maxDistance"
      @change="$emit('updateMaxDistance', maxDistance)"
    ></q-input>
    <p>
      Maximum distance parameter corresponds to the maximum distance between
      source and listener.

      <b
        >It is only used with the linear HRTF model and determines the
        attenuation factor.
      </b>

      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/maxDistance"
        >MaxDistance Documentation</a
      >
    </p>
    <q-input
      standout
      type="number"
      label="Ref distance"
      v-model="refDistance"
      @change="$emit('updateRefDistance', refDistance)"
    ></q-input>
    <p>
      The distance at which the attenuation starts taking effect.
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance"
        >RefDistance Documentation</a
      >
    </p>

    <q-input
      standout
      type="number"
      label="Rolloff factor"
      v-model="rollOffFactor"
      @change="$emit('updateRollOffFactor', rollOffFactor)"
    ></q-input>
    <p>
      Describes how quickly the volume diminishes with distance.
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/refDistance"
        >RefDistance Documentation</a
      >
    </p>
    <q-input
      standout
      type="number"
      label="Moving Step"
      v-model="movingStep"
      @change="$emit('updateMovingStep', movingStep)"
    ></q-input>
    <q-input
      standout
      type="number"
      label="Rotating Step (degrees)"
      v-model="rotatingStepDeg"
      @change="$emit('updateRotatingStep', rotatingStepDeg)"
    ></q-input>
  </div>
</template>

<script>
export default {
  name: "SourceParameters",
  data() {
    return {
      HRTFOptions: ["linear", "inverse", "exponential"],
      selectedOption: "linear",
      refDistance: 1,
      rollOffFactor: 1,
      maxDistance: 10000,
      movingStep: 10,
      rotatingStepDeg: 36,
    };
  },
};
</script>
