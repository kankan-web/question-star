import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
import { ComponentPropsType } from "../../components/QuestionComponent";

export type ComponentsInfoType = {
	//MARK:前端生成的id，服务端Mongodb不认这种格式，所以自定义一个fe_id
	fe_id: string; //TODO
	type: string;
	title: string;
	props: ComponentPropsType;
};
export type ComponentsStateType = {
	selectedId: string;
	componentList: Array<ComponentsInfoType>;
};
const INIT_STATE: ComponentsStateType = {
	selectedId: "",
	componentList: []
};

export const componentsSlice = createSlice({
	name: "components",
	initialState: INIT_STATE,
	reducers: {
		//重置所有组件
		resetComponent: (
			state: ComponentsStateType,
			action: PayloadAction<ComponentsStateType>
		) => {
			return action.payload;
		},
		//修改selectedId
		changeSelectedId: produce(
			(draft: ComponentsStateType, action: PayloadAction<string>) => {
				draft.selectedId = action.payload;
			}
		),
		//添加组件
		addComponent: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<ComponentsInfoType>
			) => {
				const newComponent = action.payload;
				const { selectedId, componentList } = draft;
				const index = componentList.findIndex(c => c.fe_id === selectedId);
				if (index < 0) {
					//未选中任何组件
					draft.componentList.push(newComponent);
				} else {
					//选中了组件，插入到index后面
					draft.componentList.splice(index + 1, 0, newComponent);
				}
				draft.selectedId = newComponent.fe_id;
			}
		),

		//修改组件属性
		changeComponentProps: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
			) => {
				const { fe_id, newProps } = action.payload;
				//找到当前要修改属性的这个组件
				const curComp = draft.componentList.find(c => c.fe_id === fe_id);
				if (curComp) {
					curComp.props = {
						...curComp.props,
						...newProps
					};
				}
			}
		)
	}
});
export const {
	resetComponent,
	changeSelectedId,
	addComponent,
	changeComponentProps
} = componentsSlice.actions;
export default componentsSlice.reducer;
