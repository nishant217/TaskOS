import React, { useEffect, useState } from "react";
import "./PreLoader.css";

import "../components/Login/Logo";

type PreLoaderProps = {
	duration?: number; // milliseconds before hiding automatically
	onFinish?: () => void;
};

const PreLoader: React.FC<PreLoaderProps> = ({ duration = 2600, onFinish }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const t = setTimeout(() => {
			setVisible(false);
			onFinish && onFinish();
		}, duration);

		return () => clearTimeout(t);
	}, [duration, onFinish]);

	if (!visible) return null;

	return (
		<div className="preloader-root" role="status" aria-live="polite">
			<div className="preloader-inner">
				<div className="logo-wrap" aria-hidden>
					<img className="preloader-logo" src="/nyneos.png" alt="TaskOS logo" />
				</div>

				<div className="preloader-text">TaskOS</div>
			</div>
		</div>
	);
};

export default PreLoader;
