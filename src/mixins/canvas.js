export default {
  data() {
    return {
      classInfoCtx: null,
    };
  },
  methods: {
    initCanvas(config) {
      let { url } = config;
      return new Promise((resolve) => {
        let that = this;
        let imgObj = new Image();
        imgObj.src = url;
        imgObj.crossOrigin = "Anonymous"; // 解决跨域问题
        imgObj.onload = function () {
          let { width, height } = imgObj;
          let canvasContainerDom = document.getElementById("canvas_image");
          let template = `<canvas id="canvas" width="${width}" height="${height}"
                    style="position: absolute;
                    top: -${Math.ceil(height / 4)}px;
                    left: -${Math.ceil(width / 4)}px;
                    transform: scale(0.5);"></canvas>`;
          canvasContainerDom.innerHTML = template;
          var canvasDom = document.getElementById("canvas");
          that.classInfoCtx = canvasDom.getContext("2d");
          // 设置画布背景图 全部显示 不拉伸
          that.classInfoCtx.drawImage(this, 0, 0);
          resolve(1);
        };
      });
    },
    // 绘制详情标题
    addContentTitle(config) {
      return new Promise((resolve) => {
        if (!config) {
          resolve("Not configured Title");
          return false;
        }
        let that = this;
        let {
          font_size,
          font_color,
          x,
          y,
          width,
          line_num,
          line_space,
          font_family,
          composing,
        } = config;
        let text = config.text || "[2023春]第二轮光学进阶第4讲 反射折射";
        that.classInfoCtx.font = `${font_size}px ${font_family}`;
        that.classInfoCtx.fillStyle = font_color;
        that.toFormateStr(
          that.classInfoCtx,
          text,
          width,
          line_num,
          x,
          font_size + y,
          line_space,
          composing
        );
        resolve("success");
      });
    },
    // 绘制年级信息
    addContentGrade(config) {
      return new Promise((resolve) => {
        if (!config) {
          resolve("Not configured Grade");
          return false;
        }
        let that = this;
        let { font_size, font_color, x, y, width, font_family, composing } =
          config;
        let text = config.text || "高一、高二、高三";
        that.classInfoCtx.font = `${font_size}px ${font_family}`;
        that.classInfoCtx.fillStyle = font_color;
        that.toFormateStr(
          that.classInfoCtx,
          text,
          width,
          1,
          x,
          font_size + y,
          1,
          composing
        );
        resolve("success");
      });
    },
    // 绘制课程大纲
    addContentOutline(config) {
      return new Promise((resolve) => {
        if (!config) {
          resolve("Not configured");
          return false;
        }
        let subClassList = [];
        // 没有配置课程大纲 用默认的
        if (config.subclass) {
          subClassList = config.subclass;
        } else {
          for (let i = 0; i < Number(config.line_num); i++) {
            subClassList.push({
              subject: "这是一个课程大纲的样例这是一个课程大纲的样例",
            });
          }
        }
        let that = this;
        let { font_size, line_num, line_space, x, y, width } = config;
        let position = config.composing;
        that.classInfoCtx.font = `${font_size}px ${config.font_family}`;
        that.classInfoCtx.fillStyle = config.font_color;
        for (let i = 0; i < line_num; i++) {
          if (subClassList[i]) {
            that.toFormateStr(
              that.classInfoCtx,
              subClassList[i].subject,
              width,
              1,
              x,
              y + font_size + i * line_space,
              font_size,
              position
            );
          }
        }
        resolve("success");
      });
    },
    // 绘制详情老师图片
    addTeacher(config) {
      return new Promise((resolve) => {
        let that = this;
        let teacherGroup = config.teacher_group;
        if (!config || !teacherGroup.length) {
          resolve("Not configured Teacher");
          return;
        }
        let teacherInfoList = [];
        teacherGroup.forEach(() => {
          let teacherInfo = {
            teacher_name: "Panda",
            random_teacher_mage: require("@/assets/image/panda.png"),
            formal_intro: `师范专业毕业7年教龄，授课时长累计6000小时擅长从逻辑梳理题型搭建精简物理体系，减轻记忆负担被学生誉为“最善良”的物理老师。以下都是测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案测试文案`,
          };
          teacherInfoList.push(teacherInfo);
        });
        let process = 0;
        for (let i = 0; i < teacherGroup.length; i++) {
          if (!teacherInfoList[i]) {
            break;
          }
          let { teacher_name, formal_intro } = teacherInfoList[i];
          // 绘制详情老师名字
          that.addTeacherName({ ...teacherGroup[i].nameConfig, teacher_name });
          // 绘制详情教师介绍
          that.addTeacherInfo({ ...teacherGroup[i].infoConfig, formal_intro });
          // 绘制教师图片
          let img = new Image();
          img.src = teacherInfoList[i].random_teacher_mage;
          img.crossOrigin = "Anonymous";
          img.onload = function () {
            let { x, y } = teacherGroup[i].imageConfig;
            that.classInfoCtx.drawImage(this, x, y);
            process++;
            if (process === teacherInfoList.length) {
              resolve("success");
            }
          };
        }
      });
    },
    // 绘制详情老师名字
    addTeacherName(config) {
      let that = this;
      let { teacher_name, font_size, font_family, font_color, width, x, y } =
        config;
      that.classInfoCtx.font = `${font_size}px ${font_family}`;
      that.classInfoCtx.fillStyle = font_color;
      that.toFormateStr(
        that.classInfoCtx,
        teacher_name,
        width,
        1,
        x,
        font_size + y,
        font_size,
        "left"
      );
    },
    // 绘制详情教师介绍
    addTeacherInfo(config) {
      let that = this;
      let {
        formal_intro,
        font_size,
        font_family,
        font_color,
        width,
        x,
        y,
        line_num,
        line_space,
      } = config;
      that.classInfoCtx.font = `${font_size}px ${font_family}`;
      that.classInfoCtx.fillStyle = font_color;
      that.toFormateStr(
        that.classInfoCtx,
        formal_intro,
        width,
        line_num,
        x,
        font_size + y,
        line_space,
        "left"
      );
    },
    _calcMaxDimension(maxWidth, maxHeight, width, height) {
      // 700 和 500 是画布的最大宽高
      const wScaleFactor = maxWidth / width;
      const hScaleFactor = maxHeight / height;
      let cssMaxWidth = Math.min(width, maxWidth);
      let cssMaxHeight = Math.min(height, maxHeight);
      if (wScaleFactor < 1 && wScaleFactor < hScaleFactor) {
        cssMaxWidth = width * wScaleFactor;
        cssMaxHeight = height * wScaleFactor;
      } else if (hScaleFactor < 1 && hScaleFactor < wScaleFactor) {
        cssMaxWidth = width * hScaleFactor;
        cssMaxHeight = height * hScaleFactor;
      }
      // window.console.log('_calcMaxDimension', width, height, this.cssMaxWidth, this.cssMaxHeight);

      return {
        width: Math.floor(cssMaxWidth),
        height: Math.floor(cssMaxHeight),
      };
    },
    // 文字换行
    toFormateStr(
      ctx,
      str,
      draw_width,
      lineNumber,
      startX,
      startY,
      steps,
      position = "left"
    ) {
      var strWidth = ctx.measureText(str).width; // 测量文本源尺寸信息（宽度）
      var startpoint = startY;
      let lineNum = lineNumber + 1;
      var keyStr = "";
      var sreLN = strWidth / draw_width;
      var liner = Math.ceil(sreLN); // 计算文本源一共能生成多少行
      let strlen = parseInt(str.length / sreLN); // 等比缩放测量一行文本显示多少个字符
      let canvasX = startX;
      if (position === "center") {
        canvasX = draw_width / 2 + startX;
      } else if (position === "right") {
        canvasX = draw_width + startX;
      }
      // 若文本不足一行，则直接绘制，反之大于传入的最多行数（lineNum）以省略号（...）代替
      if (strWidth < draw_width) {
        ctx.textAlign = position;
        ctx.fillText(str, canvasX, startpoint);
      } else {
        for (var i = 1; i < liner + 1; i++) {
          let startPoint = strlen * (i - 1);
          if (i < lineNum || lineNum === -1) {
            keyStr = str.substr(startPoint, strlen);
            ctx.textAlign = position;
            ctx.fillText(keyStr, canvasX, startpoint);
          } else {
            // keyStr = str.substr(startPoint, strlen-5) + '...';
            // ctx.fillText(keyStr, startX, startpoint);
            break;
          }
          startpoint = startpoint + steps;
        }
      }
    },
    // 获取画布数据
    getCanvasData(dom) {
      // let that = this;
      let canvas = document.getElementById(`${dom}`);
      let dataURL = canvas.toDataURL("image/png");
      return dataURL;
    },
    downloadPicture(url, fileNamePrefix) {
      // 注意该方法属于canvas元素，而不是创建的context对象
      var arr = url.split(",");
      var mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
      var bstr = atob(arr[1]); // 此处将base64解码
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
      let fileName = `${fileNamePrefix}${new Date().getTime()}`;
      var file = new File([u8arr], fileName, { type: mime });
      var aDom = document.createElement("a"); // 创建一个 a 标签
      aDom.download = file.name; // 设置文件名
      let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
      aDom.href = href; // 放入href
      document.body.appendChild(aDom); // 将a标签插入 body
      aDom.click(); // 触发 a 标签的点击
      document.body.removeChild(aDom); // 移除刚才插入的 a 标签
      // document.body.removeChild(canvasDom); // 移除刚才插入的 a 标签
      URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
      this.loading = false;
    },
    // 生成文件
    createFile(url, fileNamePrefix) {
      const data = window.atob(url.split(",")[1]);
      const ia = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
      }
      var arr = url.split(",");
      var mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
      let fileName = `${fileNamePrefix}${new Date().getTime()}${this.getRandomNum(
        1,
        99
      )}`;
      const blob = new File([ia], fileName, { type: mime }); // blob 文件
      return blob;
    },
    // 获取随机数
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
};
