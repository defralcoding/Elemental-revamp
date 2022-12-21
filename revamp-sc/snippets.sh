USER_PEM="~/wallets/development.pem"
PROXY="https://gateway.elrond.com"
CHAIN_ID="1"
CONTRACT="erd1qqqqqqqqqqqqqpgqrfxkuajmzfvcuaynau39vmnpt39463mcdn3qasa9qg"

A="--arguments str:GIANT-1ed993 str:REVAMP-6ac8d1 15"


COSEDAFARE="**********"

deploy() {
    erdpy --verbose contract deploy --project=${PROJECT} \
    --recall-nonce --pem=${USER_PEM} \
    --gas-limit=59999999 \
    --send --outfile="deploy.interaction.json" \
    --metadata-payable \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

set_old_collection() {
    erdpy contract call ${CONTRACT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=5000000 \
    --function="set_old_collection" --arguments str:ELMAPES-c79879 \
    --send \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

set_new_collection() {
    erdpy contract call ${CONTRACT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=5000000 \
    --function="set_new_collection" --arguments str:ELEMAPES-fdf51e \
    --send \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

set_nfts_left_to_send() {
    erdpy contract call ${CONTRACT} \
    --recall-nonce --pem=${USER_PEM} \
    --gas-limit=5000000 \
    --function="set_nfts_left_to_send" --arguments 1400 \
    --send \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

set_high_rank() {
    erdpy contract call ${CONTRACT} \
    --recall-nonce --pem=${USER_PEM} \
    --gas-limit=5000000 \
    --function="set_high_rank" --arguments 37 3 \
    --send \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

set_thunders_old() {
    erdpy contract call ${CONTRACT} \
    --recall-nonce --pem=${USER_PEM} \
    --gas-limit=5000000 \
    --function="set_thunders_old" --arguments 37 \
    --send \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

set_thunders_new() {
    erdpy contract call ${CONTRACT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=500000000 \
    --function="set_thunders_new" --arguments 0x03e8 0x03de 0x0424 0x0407 0x0490 0x046d 0x045b 0x04db 0xa6 0x82 0x7d 0x02e3 0x05 \
    --simulate \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

COSEDAFAREFINE="**********"

get() {
    erdpy --verbose contract query ${CONTRACT} \
    --function "getNftsLeftToSend" \
    --proxy=${PROXY} || return
}

upgrade() {
    erdpy --verbose contract upgrade ${CONTRACT} \--project=${PROJECT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=50000000 \
    --send --outfile="deploy.interaction.json" \
    --proxy=${PROXY} --chain=${CHAIN_ID} || return
}

upgrade_devnet() {
    erdpy --verbose contract upgrade erd1qqqqqqqqqqqqqpgq7qdqsuq4a4pga2hxa5h0gvluf7hlc6hndn3q32jth5 --project=${PROJECT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=50000000 \
    --send --outfile="deploy.interaction.json" \
    --proxy="https://devnet-gateway.elrond.com" --chain=D || return
}
upgrade_testnet() {
    erdpy --verbose contract upgrade erd1qqqqqqqqqqqqqpgq5j3wahajwehwja70v39074zzzjsq89lkdn3qp3j2f9 --project=${PROJECT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=50000000 \
    --send --outfile="deploy.interaction.json" \
    --proxy="https://testnet-gateway.elrond.com" --chain=T || return
}
upgrade_mainnet() {
    erdpy --verbose contract upgrade erd1qqqqqqqqqqqqqpgq5j3wahajwehwja70v39074zzzjsq89lkdn3qp3j2f9 --project=${PROJECT} \
    --recall-nonce \
    --ledger --ledger-address-index 3 \
    --gas-limit=50000000 \
    --send --outfile="deploy.interaction.json" \
    --proxy="https://gateway.elrond.com" --chain=1 || return
}