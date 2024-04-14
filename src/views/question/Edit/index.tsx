import React, { FC, useEffect } from "react";
// import useLoadQuestioin from "../../../hooks/useLoadQuestion";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas/EditCanvas";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../stores/componentsReducer";

const Edit: FC = () => {
	// const { loading, error } = useLoadQuestioin();
	const { loading, error } = useLoadQuestionData();
	const dispatch = useDispatch();
	function clearSelectedId() {
		dispatch(changeSelectedId(""));
	}

	return (
		<div className={styles.container}>
			<div style={{ backgroundColor: "#fff" }}>Header</div>
			<div className={styles["content-wrapper"]}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles["canvas-wrapper"]}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Edit;
