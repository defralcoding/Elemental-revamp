import React, { useEffect, useState } from "react";

import { getTransactions } from "@elrondnetwork/dapp-core/apiCalls";

import {
	useGetAccount,
	useGetActiveTransactionsStatus,
	useGetNetworkConfig,
} from "@elrondnetwork/dapp-core/hooks";

import { ServerTransactionType } from "@elrondnetwork/dapp-core/types";
import {
	TransactionsTable,
	Loader,
	PageState,
} from "@elrondnetwork/dapp-core/UI";
import { faBan, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";

import { apiTimeout, contractAddress, transactionSize } from "config";
import { DashboardLayout } from "./components";

const DashboardPage = () => {
	const {
		network: { apiAddress },
	} = useGetNetworkConfig();
	const { address } = useGetAccount();
	const { success, fail } = useGetActiveTransactionsStatus();
};

export const Dashboard = () => <DashboardLayout />;
