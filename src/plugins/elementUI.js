import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Message,
  Popover,
  RadioGroup,
  Radio,
  Select,
  Image,
  Divider,
  ColorPicker,
  RadioButton,
  Option,
  Loading,
} from "element-ui";
Vue.use(Loading.directive);
Vue.use(Button);
Vue.use(RadioButton);
Vue.use(Option);
Vue.use(ColorPicker);
Vue.use(Divider);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Popover);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Image);
Vue.prototype.$message = Message;
