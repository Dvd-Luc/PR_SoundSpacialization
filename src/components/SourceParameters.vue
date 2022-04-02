<template>
  <div class="Source parameters">
    <q-select
      standout
      v-model="selectedOption"
      @update:model-value="$emit('updateHRTFDistanceModel', selectedOption)"
      :options="HRTFOptions"
      label="HRTF Distance Model"
    ></q-select>
  </div>
</template>

<script>
export default {
  name: "SourceParameters",
  data() {
    return {
      HRTFOptions: ["linear", "inverse", "exponential"],
      selectedOption: null,
    };
  },
};
</script>
