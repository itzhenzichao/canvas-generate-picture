<template>
  <div>
    <el-dialog
      title="配置"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      append-to-body
      width="100%"
    >
      <div class="main">
        <div class="config-container">
          <div class="config-title">{{ title }}</div>
          <config-form
            ref="courseTitleForm"
            formName="courseTitleForm"
            subheading="标题"
            @saveForm="saveForm"
          ></config-form>
          <config-form
            ref="courseGradeForm"
            formName="courseGradeForm"
            subheading="适合学员"
            @saveForm="saveForm"
          ></config-form>
          <config-form
            ref="courseOutlineForm"
            formName="courseOutlineForm"
            subheading="课程大纲"
            @saveForm="saveForm"
          ></config-form>
          <teacher-config-form
            ref="teacherGroupForm"
            formName="teacherGroupForm"
            @saveForm="saveForm"
          ></teacher-config-form>
          <div class="config-footer">
            <el-button
              size="mini"
              type="warning"
              :disabled="!canvasImage"
              v-preventReClick
              @click="downloadPicture(canvasImage, 'newFile')"
              >下载</el-button
            >
            <el-button
              type="success"
              v-preventReClick
              size="mini"
              @click="save('save')"
              :disabled="imageLoading"
              >保存</el-button
            >
            <el-button
              type="primary"
              size="mini"
              :disabled="imageLoading"
              @click="save('preview')"
              v-preventReClick
              >预览</el-button
            >
          </div>
        </div>
        <div
          class="canvas-container"
          v-loading="imageLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div id="canvas_image"></div>
          <img :src="canvasImage" v-if="canvasImage" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ConfigForm from "./ConfigForm";
import TeacherConfigForm from "./TeacherConfigForm.vue";
import canvas from "@/mixins/canvas";

export default {
  mixins: [canvas],
  data() {
    return {
      dialogVisible: false,
      config: {},
      executeNum: 0,
      backNum: 0,
      saveType: "save",
      canvasBackgroudImage: "",
      configData: null,
      canvasImage: "",
      imageLoading: false,
    };
  },
  computed: {
    title() {
      return "详情图参数配置";
    },
  },
  components: {
    "config-form": ConfigForm,
    "teacher-config-form": TeacherConfigForm,
  },
  methods: {
    // 保存
    saveConfig() {
      this.$message.success("控制台查看保存数据");
      console.log({
        config: this.config,
        canvasImage: this.canvasImage,
        file: this.createFile(this.canvasImage, "newFile"),
      });
    },
    saveForm(config) {
      this.backNum--;
      if (config.error) {
        // this.$message.error(config.error);
        // return false;
      } else {
        this.config[config.formName] = config.form;
        this.executeNum--;
        if (this.executeNum === 0) {
          this.resetExecuteNum();
          this.saveSuccess();
          return false;
        }
      }
      // 所有表单校验完成后执行 预览功能支持部分表单绘制
      if (this.backNum === 0 && this.saveType === "preview") {
        this.preview();
      }
    },
    // 表单校验完成后执行
    saveSuccess() {
      if (this.saveType === "save") {
        this.saveConfig();
      } else {
        this.preview();
      }
    },
    removeCanvas() {
      let canvas = document.getElementById("canvas_image");
      if (canvas) {
        canvas.innerHTML = "";
      }
    },
    // 预览配置
    preview() {
      this.removeCanvas();
      this.startCanvas();
    },
    // 开始绘制 生成图片
    startCanvas() {
      this.imageLoading = true;
      // 绘制详情图
      this.initCanvas({ url: this.canvasBackgroudImage }).then(() => {
        this.$nextTick(() => {
          Promise.all([
            this.addContentTitle({
              ...this.config["courseTitleForm"],
            }),
            this.addContentGrade({
              ...this.config["courseGradeForm"],
            }),
            this.addContentOutline({
              ...this.config["courseOutlineForm"],
            }),
            this.addTeacher({
              ...this.config["teacherGroupForm"],
            }),
          ]).then(() => {
            this.canvasImage = this.getCanvasData("canvas");
            this.imageLoading = false;
          });
        });
      });
    },
    save(type) {
      // 保存类型是预览还是保存
      this.saveType = type;
      this.resetExecuteNum();
      this.config = {};
      let refName = [
        "courseTitleForm",
        "courseGradeForm",
        "courseOutlineForm",
        "teacherGroupForm",
      ];
      this.executeNum = refName.length;
      this.backNum = refName.length;
      /*
        保存表单组件 校验结果
      */
      for (let i = 0; i < refName.length; i++) {
        this.$refs[refName[i]].save();
      }
    },
    // 重置执行次数
    resetExecuteNum() {
      this.executeNum = 0;
      this.backNum = 0;
    },
    openDialog(config) {
      this.dialogVisible = true;
      this.configData = JSON.parse(JSON.stringify(config));
      let { template_img, config_params } = config;
      if (template_img) {
        this.canvasBackgroudImage = template_img;
        this.$nextTick(() => {
          // 绘制详情图
          this.initCanvas({ url: template_img }).then(() => {
            this.$nextTick(() => {
              if (config_params) {
                this.config = config_params;
                this.$refs.courseTitleForm.initConfigParams(
                  config_params.courseTitleForm
                );
                this.$refs.courseGradeForm.initConfigParams(
                  config_params.courseGradeForm
                );
                this.$refs.courseOutlineForm.initConfigParams(
                  config_params.courseOutlineForm
                );
                this.$refs.teacherGroupForm.initConfigParams(
                  config_params.teacherGroupForm
                );
              }
              this.startCanvas();
            });
          });
        });
      }
    },
  },
  directives: {
    // 防止重复点击
    preventReClick: {
      inserted(el, binding) {
        el.addEventListener("click", () => {
          if (!el.disabled) {
            el.disabled = true;
            setTimeout(() => {
              el.disabled = false;
            }, binding.value || 1000);
          }
        });
      },
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  margin: 0px;
  margin-top: 0px !important;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #e0e0e0;
  display: none;
}
::v-deep .el-dialog__body {
  height: calc(100vh);
  padding: 0px;
}
.main {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .config-container {
    width: 500px;
    min-width: 500px;
    padding: 10px 18px 0px 0px;
    margin-bottom: 58px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .canvas-container {
    flex: 1;
    min-width: 750px;
    overflow: scroll;
    padding: 20px 0px 20px 0px;
    position: relative;
    overscroll-behavior: contain;
    text-align: center;
    background: #e9e9e9;
    img {
      width: 90%;
    }
  }
  .config-footer {
    position: fixed;
    bottom: 0px;
    background: white;
    width: 497px;
    padding: 10px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
  }
  .config-title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  #canvas_image {
    display: none;
  }
}
</style>
