import React from "react";
import styles from "./../dashboard.module.scss";
import { TopInfo } from "./TopInfo";
import { YourNfts } from "./YourNfts";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import ElementalLogo from "./../../../assets/img/logo.png";

export const DashboardLayout = () => {
	const { address, account } = useGetAccountInfo();

	return (
		<div className="container-xxl py-4">
			<div style={{ textAlign: "center", marginBottom: "10px" }}>
				<img src={ElementalLogo} className="elemental-logo" />
			</div>
			<div className="row">
				<div className="col-12 col-md-10 mx-auto">
					<div className="card shadow-sm border-0">
						<div className="card-body p-1">
							<div
								className="card border-0"
								style={{ backgroundColor: "#F0973B" }}
							>
								<div className="card-body text-center p-4">
									<TopInfo />
								</div>
							</div>
						</div>
					</div>
					<div
						className="card shadow-sm border-0 mt-2"
						style={{
							backgroundColor: "rgba(255, 255, 255, 0.3)",
						}}
					>
						<div className="card-body p-1">
							<div
								className="card border-0"
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.3)",
								}}
							>
								<div className="card-body text-center p-4">
									<YourNfts />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
