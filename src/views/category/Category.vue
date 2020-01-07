<template>
  <div id="category">
    <nav-bar class="bav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-memu :categories="categories" @selectItem="selectItem" />
      <scroll id="tab-content" ref="scroll">
        <tab-content-category :subcategories="showSubcategory" :data="[categoryData]" />
        <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" />
        <tavb-content-detail :categoryDetail="showCategoryDetail" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import TabMemu from "./childComps/TabMune";
import TabContentCategory from "./childComps/TabContentCategory";
import TabControl from "components/content/tabControl/TabControl";
import TavbContentDetail from "./childComps/TabContentDetail";
import Scroll from "components/common/scroll/Scroll";
import { tabControlMixin, itemImgListener } from "../../common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMemu,
    TabContentCategory,
    TabControl,
    TavbContentDetail
  },
  mixins: [tabControlMixin, itemImgListener],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    };
  },
  created() {
    this._getCategory();
    // 事件总线 监听goodslistitem组件的图片加载完成
    /* this.$bus.$on("itemimgload", () => {
      this.$refs.scroll.refresh();
    }); */
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1. 获取分类数据
        this.categories = res.data.category.list;
        // 2. 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },
    _getCategoryDetail(type) {
      // this.currentType = type;
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    // 事件相关方法 分类组件把点击的index 传到主组件
    selectItem(index) {
      this._getSubcategories(index);
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.bav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}
#tab-content {
  flex: 1;
  height: 100%;
}
</style>
