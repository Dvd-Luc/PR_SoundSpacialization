<script>
export default {
    name = "input_value",
    data() {
    return {
      message: ''
    }
  }
}
</script>
<template>
  <p>Message is: {{ message }}</p>
	<input v-model="message" placeholder="edit me" />
</template>