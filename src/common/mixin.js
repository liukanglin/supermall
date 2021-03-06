import { debounce } from "@/common/utils";

export const itemImgListener = {
  data() {
    return {
      itemImgLoad: null
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.itemImgLoad = () => refresh();
    this.$bus.$on("itemimgload", this.itemImgLoad);
  }
};

export const backTopMixin = {
  data() {
    return {
      isshow: false // 记录回到顶部是否显示
    };
  },
  methods: {
    backClick() {
      // 获取scroll子组件中的scrollTo()方法  回到顶部
      this.$refs.scroll.scrollTo(0, 0);
      // console.log(this.$refs.scroll.scroll.scrollTo());
    }
  },
};

export const tabControlMixin = {
  data: function () {
    return {
      currentType: 'pop'
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.currentType);
    }
  }
}
