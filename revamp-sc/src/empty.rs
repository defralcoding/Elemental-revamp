#![no_std]

elrond_wasm::imports!();

/// An empty contract. To be used as a template when starting a new contract from scratch.
#[elrond_wasm::contract]
pub trait EmptyContract {

    #[init]
    fn init(&self, 
       /* old_collection: TokenIdentifier, new_collection: TokenIdentifier, number_nfts_to_send: u32*/
    ) {
        /*
        self.old_collection().set_token_id(&old_collection);
        self.new_collection().set_token_id(&new_collection);
        self.nfts_left_to_send().set_initial_len(number_nfts_to_send.try_into().unwrap());
        self.do_shuffle();
        */
    }

    #[endpoint]
    #[only_owner]
    fn set_high_rank(&self, ranks: MultiValueEncoded<MultiValue2<u64, u8>>) {
        for rank in ranks {
            let (nonce, number) = rank.into_tuple();
            self.high_rank(nonce).set(number);
        }
    }

    #[endpoint]
    #[payable("*")]
    fn swap(&self,
        #[payment_token] payment_token: EgldOrEsdtTokenIdentifier,
        #[payment_nonce] nonce: u64) {
        
        let old_collection = self.old_collection().get_token_id();

        require!(payment_token == old_collection, "Wrong NFT Provided");
        
        //check if is high ranks
        let high_rank = self.high_rank(nonce).get();
        let n_nfts_to_send = 1 + high_rank;

        //send nfts
        for _ in 0..n_nfts_to_send {
            self.send_nft();
        }

        //temp
        self.send().direct(&self.blockchain().get_owner_address(), &payment_token, nonce, &BigUint::from(1u8));
    }

    fn send_nft(&self) {
        let next_index_to_send_tuple = self.next_index_to_send().get();
        let new_collection = self.new_collection().get_token_id();
        let identifier = EgldOrEsdtTokenIdentifier::esdt(new_collection);
        let caller = self.blockchain().get_caller();

        self.send().direct(
            &caller,
            &identifier,
            next_index_to_send_tuple.1.try_into().unwrap(),
            &BigUint::from(1u8),
        );

        self.handle_next_index_setup(next_index_to_send_tuple);
    }

    fn do_shuffle(&self) {
        let uid = self.nfts_left_to_send();

        let uid_len = uid.len();
        let mut rand_source = RandomnessSource::<Self::Api>::new();

        let index = rand_source.next_usize_in_range(1, uid_len + 1);

        let choosen_item = uid.get(index);

        self.next_index_to_send().set((index, choosen_item));
    }

    fn handle_next_index_setup(&self, minted_index_tuple: (usize, usize)) {
        let is_sent_indexes_total_empty = self.sent_indexes_total().is_empty();
        if is_sent_indexes_total_empty {
            self.sent_indexes_total().set(1);
        } else {
            self.sent_indexes_total().update(|sum| *sum += 1);
        }

        let total_tokens_left = self.total_tokens_left();

        if total_tokens_left > 0 {
            let mut uid = self.nfts_left_to_send();
            let _ = uid.swap_remove(minted_index_tuple.0);
            self.do_shuffle();
        }
    }

    #[view(getTotalTokensLeft)]
    fn total_tokens_left(&self) -> usize {
        self.nfts_left_to_send().len()
    }

    #[storage_mapper("highRank")]
    fn high_rank(&self, nonce: u64) -> SingleValueMapper<u8>;

    #[storage_mapper("oldCollection")]
    fn old_collection(&self) -> NonFungibleTokenMapper<Self::Api>;

    #[storage_mapper("newCollection")]
    fn new_collection(&self) -> NonFungibleTokenMapper<Self::Api>;

    #[storage_mapper("nftsLeftToSend")]
    fn nfts_left_to_send(&self) -> UniqueIdMapper<Self::Api>;

    #[storage_mapper("nextIndexToSend")]
    fn next_index_to_send(&self) -> SingleValueMapper<(usize, usize)>;

    #[storage_mapper("sentIndexesTotal")]
    fn sent_indexes_total(&self) -> SingleValueMapper<u32>;
    
}