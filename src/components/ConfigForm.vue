<template>
  <div>
    <div>
      <el-divider content-position="left">{{ subheading }}</el-divider>
      <el-form :ref="formName" :model="form" label-width="80px">
        <div class="item-line">
          <el-form-item label="位置:" prop="x" :rules="form_rulesIncludeZero">
            <div class="item-line">
              <span class="item-line-label">x:</span>
              <el-input
                placeholder="请填写"
                v-model="form.x"
                :disabled="disabledStatus"
                type="number"
              >
                <template slot="append">px</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item
            label=""
            prop="y"
            label-width="0px"
            :rules="form_rulesIncludeZero"
          >
            <div class="item-line">
              <span class="item-line-label">y:</span
              ><el-input
                placeholder="请填写"
                v-model="form.y"
                type="number"
                :disabled="disabledStatus"
                ><template slot="append">px</template></el-input
              >
            </div>
          </el-form-item>
        </div>
        <el-form-item label="宽度:" prop="width" :rules="form_rules">
          <el-input
            placeholder="请填写"
            :disabled="disabledStatus"
            v-model="form.width"
            type="number"
            ><template slot="append">px</template></el-input
          >
        </el-form-item>
        <el-form-item
          v-if="isShowItem"
          label="行间距:"
          prop="line_space"
          :rules="form_rules"
        >
          <el-input
            placeholder="请填写"
            :disabled="disabledStatus"
            v-model="form.line_space"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="isShowItem"
          label="行数:"
          prop="line_num"
          :rules="form_rules"
        >
          <el-input
            placeholder="请填写"
            :disabled="disabledStatus"
            v-model="form.line_num"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="排版:">
          <el-radio-group
            v-model="form.composing"
            size="mini"
            :disabled="disabledStatus"
          >
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体">
          <el-select
            :disabled="disabledStatus"
            v-model="form.font_family"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in fontList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-popover placement="right-end" width="100" trigger="click">
            <div style="font-family: BaiDuZongYi">百度字体</div>
            <div style="font-family: FangZheng">方正字体</div>
            <div style="font-family: PanMenZhengDao">庞门正道字体</div>
            <div style="font-family: RuiZi">锐字真言体字体</div>
            <div style="font-family: SourceHanSans">思源黑体</div>
            <i class="el-icon-info" slot="reference"></i>
          </el-popover>
        </el-form-item>
        <el-form-item label="字号" prop="font_size" :rules="form_rules">
          <el-input
            placeholder="请填写"
            type="number"
            :disabled="disabledStatus"
            v-model="form.font_size"
            ><template slot="append">px</template></el-input
          >
        </el-form-item>
        <el-form-item
          label="颜色"
          prop="font_color"
          :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
        >
          <el-color-picker
            :disabled="disabledStatus"
            v-model="form.font_color"
          ></el-color-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formName: {
      type: String,
      default: "",
    },
    subheading: {
      type: String,
      default: "副标题",
    },
    disabledStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var validateNumber = (rule, value, callback) => {
      let reg1 = /^[1-9]\d*(\.\d+)?$/;
      if (!reg1.test(Number(value))) {
        callback(new Error("请输入大于0的数字"));
      } else {
        callback();
      }
    };
    var validateNumberIncludeZero = (rule, value, callback) => {
      let reg2 = /^\d+(\.\d+)?$/;
      if (!reg2.test(Number(value))) {
        callback(new Error("请输入大于等于0的数字"));
      } else {
        callback();
      }
    };
    return {
      form: {
        x: "",
        y: "",
        width: "", // 宽度
        line_space: 36, // 行间距
        line_num: 1, // 行数
        composing: "left", // 排版
        font_family: "SourceHanSans", // 字体
        font_size: 12, // 字体大小
        font_color: "#000000", // 字体颜色
      },
      fontList: [
        { value: "BaiDuZongYi", label: "百度字体" },
        { value: "FangZheng", label: "方正字体" },
        { value: "PanMenZhengDao", label: "庞门正道字体" },
        { value: "RuiZi", label: "锐字真言体字体" },
        { value: "SourceHanSans", label: "思源黑体" },
      ],
      form_rules: [
        { required: true, message: "请填写", trigger: "blur" },
        { validator: validateNumber, trigger: "blur" },
      ],
      form_rulesIncludeZero: [
        { required: true, message: "请填写", trigger: "blur" },
        { validator: validateNumberIncludeZero, trigger: "blur" },
      ],
    };
  },
  methods: {
    initConfigParams(params) {
      this.form = params;
    },
    save() {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          this.$emit("saveForm", {
            formName: this.formName,
            form: this.form,
          });
        } else {
          this.$emit("saveForm", {
            error: "检查表单数据",
          });
          return false;
        }
      });
    },
  },
  computed: {
    isShowItem() {
      return this.formName !== "courseGradeForm";
    },
  },
};
</script>
<style lang="scss" scoped>
.el-icon-info {
  font-size: 18px;
  color: orange;
  margin-left: 4px;
  cursor: pointer;
}
.item-line {
  display: flex;
  .item-line-label {
    padding: 0px 10px;
    display: inline-block;
    min-width: 40px;
  }
}
</style>
