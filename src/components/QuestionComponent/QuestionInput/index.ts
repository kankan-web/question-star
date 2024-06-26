/**
 * @description 问卷 标题
 * @author 双越老师
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionInputDefaultProps } from "./type";

export * from "./type";

// Title 组件的配置
export default {
	title: "输入框",
	type: "questionInput", // 要和后端统一好
	Component, //画布显示的组件
	PropComponent, //修改组件属性显示的组件
	defaultProps: QuestionInputDefaultProps
};
