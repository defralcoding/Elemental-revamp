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

export const TopInfo = () => {
	const { address, account } = useGetAccountInfo();

	const [userNfts, setUserNfts] = useState(Array());

	const getUserNfts = async () => {
		fetch(
			`${apiAddress}/accounts/${address}/nfts?collections=${oldCollection}&size=1000`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setUserNfts(data);
			});
	};

	useEffect(() => {
		getUserNfts();
		//getFixedNfts();
	}, []);

	return (
		<div className="text-white" data-testid="topInfo">
			<div className="mb-1">
				<span className="opacity-6 mr-1">Your address:</span>
				<span data-testid="accountAddress"> {address}</span>
			</div>
			<div className="mb-4">
				<span className="opacity-6 mr-1">Contract address:</span>
				<span data-testid="contractAddress"> {contractAddress}</span>
			</div>
			<div>
				<h3 className="py-2">You have {userNfts.length} NFT(s) to Swap</h3>
			</div>
		</div>
	);
};
