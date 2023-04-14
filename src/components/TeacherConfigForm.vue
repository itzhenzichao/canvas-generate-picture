<template>
  <div>
    <div>
      <el-divider content-position="left">主讲老师</el-divider>
      <el-form :ref="formName" :model="form" label-width="80px">
        <div
          class="teacher-group"
          v-for="(item, index) in form.teacher_group"
          :key="index"
        >
          <el-divider>第{{ index + 1 }}位老师</el-divider>
          <!-- 头像 -->
          <h5 class="option-title">头像</h5>
          <div class="item-line">
            <el-form-item
              label="位置:"
              :prop="'teacher_group.' + index + '.imageConfig.x'"
              :rules="form_rulesIncludeZero"
            >
              <div class="item-line">
                <span class="item-line-label">x:</span>
                <el-input
                  placeholder="请填写"
                  :disabled="disabledStatus"
                  v-model="item.imageConfig.x"
                  type="number"
                >
                  <template slot="append">px</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item
              label=""
              label-width="0px"
              :prop="'teacher_group.' + index + '.imageConfig.y'"
              :rules="form_rulesIncludeZero"
            >
              <div class="item-line">
                <span class="item-line-label">y:</span
                ><el-input
                  :disabled="disabledStatus"
                  placeholder="请填写"
                  v-model="item.imageConfig.y"
                  type="number"
                  ><template slot="append">px</template></el-input
                >
              </div>
            </el-form-item>
          </div>
          <!-- 姓名 -->
          <h5 class="option-title">姓名</h5>
          <div>
            <div class="item-line">
              <el-form-item
                label="位置:"
                :prop="'teacher_group.' + index + '.nameConfig.x'"
                :rules="form_rulesIncludeZero"
              >
                <div class="item-line">
                  <span class="item-line-label">x:</span>
                  <el-input
                    placeholder="请填写"
                    :disabled="disabledStatus"
                    v-model="item.nameConfig.x"
                    type="number"
                  >
                    <template slot="append">px</template>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item
                label=""
                label-width="0px"
                :prop="'teacher_group.' + index + '.nameConfig.y'"
                :rules="form_rulesIncludeZero"
              >
                <div class="item-line">
                  <span class="item-line-label">y:</span
                  ><el-input
                    :disabled="disabledStatus"
                    placeholder="请填写"
                    v-model="item.nameConfig.y"
                    type="number"
                    ><template slot="append">px</template></el-input
                  >
                </div>
              </el-form-item>
            </div>
            <el-form-item
              label="宽度:"
              :rules="form_rules"
              :prop="'teacher_group.' + index + '.nameConfig.width'"
            >
              <el-input
                placeholder="请填写"
                :disabled="disabledStatus"
                v-model="item.nameConfig.width"
                type="number"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item label="字体">
              <el-select
                :disabled="disabledStatus"
                v-model="item.nameConfig.font_family"
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
            <el-form-item
              label="字号"
              :rules="form_rules"
              :prop="'teacher_group.' + index + '.nameConfig.font_size'"
            >
              <el-input
                placeholder="请填写"
                :disabled="disabledStatus"
                v-model="item.nameConfig.font_size"
                type="number"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item
              label="颜色"
              :prop="'teacher_group.' + index + '.nameConfig.font_color'"
              :rules="[
                { required: true, message: '请选择', trigger: 'change' },
              ]"
            >
              <el-color-picker
                :disabled="disabledStatus"
                v-model="item.nameConfig.font_color"
              ></el-color-picker>
            </el-form-item>
          </div>
          <!-- 介绍 -->
          <h5 class="option-title">介绍</h5>
          <div>
            <div class="item-line">
              <el-form-item
                label="位置:"
                :rules="form_rulesIncludeZero"
                :prop="'teacher_group.' + index + '.infoConfig.x'"
              >
                <div class="item-line">
                  <span class="item-line-label">x:</span>
                  <el-input
                    placeholder="请填写"
                    :disabled="disabledStatus"
                    v-model="item.infoConfig.x"
                    type="number"
                  >
                    <template slot="append">px</template>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item
                label=""
                label-width="0px"
                :rules="form_rulesIncludeZero"
                :prop="'teacher_group.' + index + '.infoConfig.y'"
              >
                <div class="item-line">
                  <span class="item-line-label">y:</span
                  ><el-input
                    :disabled="disabledStatus"
                    placeholder="请填写"
                    v-model="item.infoConfig.y"
                    type="number"
                    ><template slot="append">px</template></el-input
                  >
                </div>
              </el-form-item>
            </div>
            <el-form-item
              label="宽度:"
              :rules="form_rules"
              :prop="'teacher_group.' + index + '.infoConfig.width'"
            >
              <el-input
                placeholder="请填写"
                :disabled="disabledStatus"
                v-model="item.infoConfig.width"
                type="number"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item
              label="行间距:"
              :rules="form_rules"
              :prop="'teacher_group.' + index + '.infoConfig.line_space'"
            >
              <el-input
                placeholder="请填写"
                :disabled="disabledStatus"
                type="number"
                v-model="item.infoConfig.line_space"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="行数:"
              :rules="form_rules"
              :prop="'teacher_group.' + index + '.infoConfig.line_num'"
            >
              <el-input
                placeholder="请填写"
                :disabled="disabledStatus"
                type="number"
                v-model="item.infoConfig.line_num"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体">
              <el-select
                :disabled="disabledStatus"
                v-model="item.infoConfig.font_family"
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
            <el-form-item
              label="字号"
              :rules="form_rules"
              :prop="'teacher_group.' + index + '.infoConfig.font_size'"
            >
              <el-input
                placeholder="请填写"
                type="number"
                :disabled="disabledStatus"
                v-model="item.infoConfig.font_size"
                ><template slot="append">px</template></el-input
              >
            </el-form-item>
            <el-form-item
              label="颜色"
              :prop="'teacher_group.' + index + '.infoConfig.font_color'"
              :rules="[
                { required: true, message: '请选择', trigger: 'change' },
              ]"
            >
              <el-color-picker
                :disabled="disabledStatus"
                v-model="item.infoConfig.font_color"
              ></el-color-picker>
            </el-form-item>
          </div>
          <div style="text-align: right">
            <el-button
              type="danger"
              :disabled="disabledStatus"
              icon="el-icon-delete"
              circle
              @click="deleteItem(index)"
            ></el-button>
          </div>
        </div>
      </el-form>
      <div style="text-align: right">
        <el-button
          type="primary"
          :disabled="disabledStatus"
          @click="addItem"
          size="medium"
          >新增老师</el-button
        >
      </div>
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
        teacher_group: [], // 老师分组
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
  mounted() {},
  methods: {
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
    deleteItem(index) {
      this.form.teacher_group.splice(index, 1);
    },
    addItem() {
      this.form.teacher_group.push({
        imageConfig: {
          x: "",
          y: "",
        },
        nameConfig: {
          x: "",
          y: "",
          width: "", // 宽度
          font_family: "SourceHanSans", // 字体
          font_size: 12, // 字体大小
          font_color: "#000000", // 字体颜色
        },
        infoConfig: {
          x: "",
          y: "",
          width: "", // 宽度
          line_space: 36, // 行间距
          line_num: 1, // 行数
          font_family: "SourceHanSans", // 字体
          font_size: 12, // 字体大小
          font_color: "#000000", // 字体颜色
        },
      });
    },
    initConfigParams(params) {
      this.form = params;
    },
  },
};
</script>
<style lang="scss" scoped>
.item-line {
  display: flex;
  .item-line-label {
    padding: 0px 10px;
    display: inline-block;
    min-width: 40px;
  }
}
.teacher-group {
  padding: 0px 0px 10px 0px;
  .option-title {
    padding: 0px 0px 0px 10px;
  }
}
.el-icon-info {
  font-size: 18px;
  color: orange;
  margin-left: 4px;
  cursor: pointer;
}
</style>
