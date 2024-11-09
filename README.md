# OR :: Onchain Reputation protocol

## How it works

### 1. Tokens as a Reputation Signal

Just like sending ERC20 tokens to a wallet, you send on-chain reputation (OR) positive (+) sentiment 👍 votes or negative (-) sentiment 👎 votes as tokens from a wallet.

**...wait, but why would people want to spend their tokens?**


### 2. Bounce Tokens

Bounce Tokens are a new class of token that, when you send it, bounces back to you. This way, users' sentiment votes are recorded on-chain while maintaining token balance.

**...wait, but what about Sybil attacks, fake accounts, and spam?**

### 3. Custom Sentiment Interpretation

Bounce Token sentiment votes on-chain form the basic reputation signals, or "primitives." An Interpreter worker scores casting this raw data according to the user's own values and criteria. _(For example, an end-user or integrated app/wallet displaying OR scores might only cast votes once per month per address, ignore accounts without a Gitcoin Passport, or amplify friends' (selected list) votes by 10x.)_

**...wait, but how do we rate real-world entities?**


### 4. Onchain Reputation for All Entities

IRL entities can have unique hashed identifiers, just as an Ethereum address is a Keccak-256 hash output of the public key. We hash an off-chain entity to an address, and users can send OR tokens to vote sentiment. For instance, to rate Google.com or Elon Musk's X

**This allows you to assign on-chain reputation sentiments to off-chain entities, creating a universal, modular, decentralized reputation.**