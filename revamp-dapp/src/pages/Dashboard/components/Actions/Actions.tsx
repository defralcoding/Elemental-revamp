import * as React from "react";
import { useEffect, useState } from "react";
import { useGetPendingTransactions } from "@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions";
import { sendTransactions } from "@elrondnetwork/dapp-core/services";
import { refreshAccount } from "@elrondnetwork/dapp-core/utils";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Address,
	ESDTNFTTransferPayloadBuilder,
	TokenPayment,
} from "@elrondnetwork/erdjs";
import moment from "moment";
import {
	contractAddress,
	oldCollection,
	newCollection,
	apiAddress,
} from "config";

export const Actions = () => {
	const { address, account } = useGetAccountInfo();
	const { hasPendingTransactions } = useGetPendingTransactions();

	const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
			string | null
		>(null);

	const sendSwap = async () => {
		//Get NFTs
		let nfts = Array();

		fetch(
			`${apiAddress}/accounts/${address}/nfts?collections=${oldCollection}&size=1000`
		)
			.then((response) => response.json())
			.then(async (data) => {
				nfts = data;
				console.log(nfts);

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
						successMessage: "Swap completed!",
					},
					redirectAfterSign: false,
				});
				if (sessionId != null) {
					setTransactionSessionId(sessionId);
				}
			});

		/*
    const pingTransaction = {
      value: pingAmount,
      data: 'ping',
      receiver: contractAddress,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId , error } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
    */
	};

	return (
		<div className="d-flex mt-4 justify-content-center">
			<div className="action-btn" onClick={sendSwap}>
				<button className="btn">
					<FontAwesomeIcon icon={faArrowUp} className="text-primary" />
				</button>
				<a href="/" className="text-white text-decoration-none">
					Swap All
				</a>
			</div>
		</div>
	);
};
