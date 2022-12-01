import * as React from "react";
import { useState, useEffect } from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { FormatAmount } from "@elrondnetwork/dapp-core/UI/FormatAmount";
import {
	contractAddress,
	oldCollection,
	newCollection,
	apiAddress,
} from "config";

export const YourNfts = () => {
	const { address, account } = useGetAccountInfo();

	const [userNfts, setUserNfts] = useState(Array());

	const getUserNfts = async () => {
		fetch(
			`${apiAddress}/accounts/${address}/nfts?collections=${newCollection}&size=1000`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setUserNfts(data);
			});
	};

	useEffect(() => {
		getUserNfts();
	}, []);

	return (
		<div className="text-primary" data-testid="topInfo">
			<div>
				<h3 className="py-2">Your new NFTs</h3>
				<div>
					<div
						style={{
							display: "flex",
							flexFlow: "row wrap",
							alignItems: "center",
							placeContent: "flex-start space-evenly",
							flexBasis: "auto",
							gap: "30px",
							boxSizing: "border-box",
						}}
					>
						{userNfts.map((nft) => (
							<div className="card card-nft shadow-lg mb-4">
								<div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
									<div className="hover-img border-radius-lg">
										<img
											src={nft.media[0].url}
											className="img-fluid border-radius-lg"
											alt="img-0"
											style={{ maxWidth: "275px" }}
										/>
									</div>
								</div>
								<div className="card-body py-3 d-flex justify-content-between">
									<a
										className="m-0 font-weight-bold text-capitalize"
										href={"https://inspire.art/nfts/" + nft.identifier}
										target="_blank"
									>
										{nft.name}
									</a>
									<a
										className="m-0 font-weight-bold"
										href={"https://inspire.art/nfts/" + nft.identifier}
										target="_blank"
									>
										#{nft.nonce}
									</a>
								</div>
							</div>
						))}
						{userNfts.length === 0 && "You don't have any new NFTs yet."}
					</div>
				</div>
			</div>
		</div>
	);
};
