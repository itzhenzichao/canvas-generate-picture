<template>
  <div>
    <config-box ref="configBox"></config-box>
    <!-- 此代码是先使用字体一次 让字体文件下载下来，为了canvas可以实现插入不同字体 -->
    <div>
      <div style="font-family: BaiDuZongYi">百度字体</div>
      <div style="font-family: FangZheng">方正字体</div>
      <div style="font-family: PanMenZhengDao">庞门正道字体</div>
      <div style="font-family: RuiZi">锐字真言体字体</div>
      <div style="font-family: SourceHanSans">SourceHanSans字体</div>
    </div>
  </div>
</template>
<script>
import ConfigBox from "@/components/ConfigBox.vue";
import image from "@/assets/image/template.png";
import initConfig from "@/mixins/init_config";

export default {
  name: "Home",
  mixins: [initConfig],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.configBox.openDialog({
        template_img: image,
        config_params: this.config,
      });
    });
  },
  components: {
    "config-box": ConfigBox,
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/fonts/generate-picture-font/baidu/index.css";
@import "../assets/fonts/generate-picture-font/fangzheng/index.css";
@import "../assets/fonts/generate-picture-font/ruizi/index.css";
@import "../assets/fonts/generate-picture-font/pangmen/index.css";
@import "../assets/fonts/generate-picture-font/sourcehan/index.css";
</style>
