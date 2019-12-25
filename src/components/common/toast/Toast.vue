<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message = "默认参数", duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 12px 14px;
  font-size: 18px;
  border-radius: 5px;
  letter-spacing: 1px;
}
</style>