import * as React from "react";
import { useState, useEffect } from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { FormatAmount } from "@elrondnetwork/dapp-core/UI/FormatAmount";
import { useGetPendingTransactions } from "@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions";
import { sendTransactions } from "@elrondnetwork/dapp-core/services";
import { refreshAccount } from "@elrondnetwork/dapp-core/utils";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Address,
	ESDTNFTTransferPayloadBuilder,
	TokenPayment,
} from "@elrondnetwork/erdjs";
import {
	contractAddress,
	oldCollection,
	newCollection,
	apiAddress,
} from "config";

export const TopInfo = () => {
	const { address, account } = useGetAccountInfo();
	const { hasPendingTransactions } = useGetPendingTransactions();

	const [userNfts, setUserNfts] = useState(Array());

	const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
			string | null
		>(null);

	const getUserNfts = async () => {
		fetch(
			`${apiAddress}/accounts/${address}/nfts?collections=${oldCollection}&size=1000`
		)
			.then((response) => response.json())
			.then((data) => {
				setUserNfts(data);
			});
	};

	useEffect(() => {
		getUserNfts();
	}, []);

	const sendSwap = async () => {
		//Get NFTs
		let nfts = Array();

		fetch(
			`${apiAddress}/accounts/${address}/nfts?collections=${oldCollection}&size=1000`
		)
			.then((response) => response.json())
			.then(async (data) => {
				nfts = data;

				//Create transactions
				let transactions = Array();
				nfts.forEach((nft) => {
					let payment = TokenPayment.nonFungible(nft.collection, nft.nonce);
					let payload = new ESDTNFTTransferPayloadBuilder()
						.setPayment(payment)
						.setDestination(new Address(contractAddress))
						.build();

					transactions.push({
						value: 0,
						data: payload.toString() + "@" + "73776170", //swap
						receiver: address,
						gasLimit: 10_000_000,
					});
				});

				await refreshAccount();

				const { sessionId, error } = await sendTransactions({
					transactions: transactions,
					transactionsDisplayInfo: {
						processingMessage: "Processing Swap transaction",
						errorMessage: "An error has occured during Swap",
						successMessage: "Swap completed! :)",
					},
					redirectAfterSign: false,
				});
				if (sessionId != null) {
					setTransactionSessionId(sessionId);
				}
			});
	};

	return (
		<>
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

			<div className="d-flex mt-4 justify-content-center">
				<div className="action-btn" onClick={sendSwap}>
					<button className="btn" disabled={userNfts.length == 0}>
						<FontAwesomeIcon icon={faArrowUp} className="text-primary" />
					</button>
					<a href="/" className="text-white text-decoration-none">
						{userNfts.length ? "Swap All" : "No NFTs to Swap"}
					</a>
				</div>
			</div>
		</>
	);
};
