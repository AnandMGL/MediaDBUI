import React from "react";


/**
 * Magic icon controller
 * @param {{
 * name: "home"|"grid";
 * }} props Props for the component
 *
 */


function MagicIcon({ name = "geo", className = "" }) {

	const Icon = React.lazy(() =>
		import(`../../assets/icons/${name}.svg`).then((module) => ({
			default: module,
		}))
	);
	return (
		<React.Suspense fallback={<div />}>
			<div className={`magic-icon ${className}`}>
				<Icon />
			</div>
		</React.Suspense>
	);
}

export default React.memo(MagicIcon);
