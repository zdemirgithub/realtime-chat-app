<template>
  <div class="message">
    <strong>{{ message.user }}:</strong>
    <span>{{ message.text }}</span>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.message {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
}
strong {
  margin-right: 10px;
  color: #333;
}
span {
  color: #555;
}
</style>
