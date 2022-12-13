import React from "react";
import { AuthenticatedRoutesWrapper } from "@elrondnetwork/dapp-core/wrappers";
import { useLocation } from "react-router-dom";
import { routes, routeNames } from "routes";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import ElementalBg from "/bg.png";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const { search } = useLocation();
	return (
		<div
			className="bg-light d-flex flex-column flex-fill wrapper"
			style={{
				backgroundImage: `url(/bg.png)`,
				backgroundSize: "cover",
			}}
		>
			<Navbar />
			<div>
				<main className="d-flex flex-column flex-grow-1">
					<AuthenticatedRoutesWrapper
						routes={routes}
						unlockRoute={`${routeNames.unlock}${search}`}
					>
						{children}
					</AuthenticatedRoutesWrapper>
				</main>
				<Footer />
			</div>
		</div>
	);
};
