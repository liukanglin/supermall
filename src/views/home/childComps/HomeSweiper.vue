<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSweiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isload: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgload() {
      if (!this.isload) {
        this.$emit("swiperimgload");
        this.isload = true;
      }
    }
  }
};
</script>

<style></style>
