export default {
  data() {
    return {
      // config: {
      //   teacher: {
      //     teacher_group: [],
      //   },
      // },
      config: {
        courseTitleForm: {
          x: 199,
          y: 20,
          width: 430, // 宽度
          line_space: 100, // 行间距
          line_num: 2, // 行数
          composing: "center", // 排版
          font_family: "BaiDuZongYi", // 字体
          font_size: 49, // 字体大小
          font_color: "#000000", // 字体颜色
        },
        courseGradeForm: {
          x: 265,
          y: 380,
          width: 200, // 宽度
          line_space: 36, // 行间距
          line_num: 1, // 行数
          composing: "left", // 排版
          font_family: "SourceHanSans", // 字体
          font_size: 25, // 字体大小
          font_color: "#000000", // 字体颜色
        },
        courseOutlineForm: {
          x: 265,
          y: 800,
          width: 200, // 宽度
          line_space: 62, // 行间距
          line_num: 5, // 行数
          composing: "left", // 排版
          font_family: "SourceHanSans", // 字体
          font_size: 25, // 字体大小
          font_color: "#000000", // 字体颜色
        },
        teacherGroupForm: {
          // 老师分组
          teacher_group: [
            {
              imageConfig: {
                x: "500",
                y: "1375",
              },
              nameConfig: {
                x: "80",
                y: "1350",
                width: "200",
                font_family: "RuiZi",
                font_size: 35,
                font_color: "#547E99",
              },
              infoConfig: {
                x: "80",
                y: "1425",
                width: "370",
                line_space: "40",
                line_num: "5",
                font_family: "BaiDuZongYi",
                font_size: 25,
                font_color: "#000000",
              },
            },
          ],
        },
      },
    };
  },
};
