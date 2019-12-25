<template>
  <div class="warpper">
    <ul>
      <li>导航1</li>
      <li>导航2</li>
      <li>导航3</li>
      <li>导航4</li>
      <li>导航5</li>
      <li>导航6</li>
      <li>导航7</li>
      <li>导航8</li>
      <li>导航9</li>
      <li>导航10</li>
      <li>导航11</li>
      <li>导航12</li>
      <li>导航13</li>
      <li>导航14</li>
      <li>导航15</li>
      <li>导航16</li>
      <li>导航17</li>
      <li>导航18</li>
      <li>导航19</li>
      <li>导航20</li>
      <li>导航21</li>
      <li>导航22</li>
      <li>导航23</li>
      <li>导航24</li>
      <li>导航25</li>
      <li>导航26</li>
      <li>导航27</li>
      <li>导航28</li>
      <li>导航29</li>
      <li>导航30</li>
      <li>导航31</li>
      <li>导航32</li>
      <li>导航33</li>
      <li>导航34</li>
      <li>导航35</li>
      <li>导航36</li>
      <li>导航37</li>
      <li>导航38</li>
      <li>导航39</li>
      <li>导航40</li>
      <li>导航41</li>
      <li>导航42</li>
      <li>导航43</li>
      <li>导航44</li>
      <li>导航45</li>
      <li>导航46</li>
      <li>导航47</li>
      <li>导航48</li>
      <li>导航49</li>
      <li>导航50</li>
      <li>导航51</li>
      <li>导航52</li>
      <li>导航53</li>
      <li>导航54</li>
      <li>导航55</li>
      <li>导航56</li>
      <li>导航57</li>
      <li>导航58</li>
      <li>导航59</li>
      <li>导航60</li>
      <li>导航61</li>
      <li>导航62</li>
      <li>导航63</li>
      <li>导航64</li>
      <li>导航65</li>
      <li>导航66</li>
      <li>导航67</li>
      <li>导航68</li>
      <li>导航69</li>
      <li>导航70</li>
      <li>导航71</li>
      <li>导航72</li>
      <li>导航73</li>
      <li>导航74</li>
      <li>导航75</li>
      <li>导航76</li>
      <li>导航77</li>
      <li>导航78</li>
      <li>导航79</li>
      <li>导航80</li>
      <li>导航81</li>
      <li>导航82</li>
      <li>导航83</li>
      <li>导航84</li>
      <li>导航85</li>
      <li>导航86</li>
      <li>导航87</li>
      <li>导航88</li>
      <li>导航89</li>
      <li>导航90</li>
      <li>导航91</li>
      <li>导航92</li>
      <li>导航93</li>
      <li>导航94</li>
      <li>导航95</li>
      <li>导航96</li>
      <li>导航97</li>
      <li>导航98</li>
      <li>导航99</li>
      <li>导航100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      bscroll: null
    };
  },
  mounted() {
    this.bscroll = new BScroll(".warpper", {
      // 填入这个参数才可以实时监测到滚动的位置
      probeType: 3,
      // pullUpLoad 为true时 才可以监听pullUpLoad 上拉加载更多事件
      pullUpLoad: true
    });
    this.bscroll.on("scroll", position => {
      // console.log(position);
    });
    this.bscroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 调用finishPullUp() 方法可以触发多次上拉事件
      this.bscroll.finishPullUp();
    });
  }
};
</script>

<style scoped>
/* 
 最外层父元素 必须指定高度  而且只能包裹一个元素 
*/
.warpper {
  height: 200px;
  background-color: red;
}
</style>
