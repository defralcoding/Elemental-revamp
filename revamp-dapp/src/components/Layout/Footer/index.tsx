import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/img/heart.svg";

export const Footer = () => {
	return (
		<footer className="text-center mt-2 mb-3">
			<div>
				<a
					{...{
						target: "_blank",
					}}
					className="d-flex align-items-center text-white"
					href="https://www.elementalapes.com/"
				>
					Made with <HeartIcon className="mx-1" /> by Elemental Apes.
				</a>
			</div>
		</footer>
	);
};
