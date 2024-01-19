import { ChainId } from '@uniswap/sdk-core'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}
const QUICKNODE_MAINNET_RPC_URL = process.env.REACT_APP_QUICKNODE_MAINNET_RPC_URL
if (typeof QUICKNODE_MAINNET_RPC_URL === 'undefined') {
  throw new Error(`REACT_APP_QUICKNODE_MAINNET_RPC_URL must be a defined environment variable`)
}
const QUICKNODE_BNB_RPC_URL = process.env.REACT_APP_BNB_RPC_URL
if (typeof QUICKNODE_BNB_RPC_URL === 'undefined') {
  throw new Error(`REACT_APP_BNB_RPC_URL must be a defined environment variable`)
}

export const FALLBACK_URLS = {
  [ChainId.MAINNET]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  [ChainId.GOERLI]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli',
  ],
  [ChainId.SEPOLIA]: [
    // "Safe" URLs
    'https://rpc.sepolia.dev/',
    // "Fallback" URLs
    'https://rpc.sepolia.org/',
    'https://rpc2.sepolia.org/',
    'https://rpc.sepolia.online/',
    'https://www.sepoliarpc.space/',
    'https://rpc-sepolia.rockx.com/',
    'https://rpc.bordel.wtf/sepolia',
  ],
  [ChainId.POLYGON]: [
    // "Safe" URLs
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
  ],
  [ChainId.POLYGON_MUMBAI]: [
    // "Safe" URLs
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com',
  ],
  [ChainId.ARBITRUM_ONE]: [
    // "Safe" URLs
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com',
  ],
  [ChainId.ARBITRUM_GOERLI]: [
    // "Safe" URLs
    'https://goerli-rollup.arbitrum.io/rpc',
  ],
  [ChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism',
  ],
  [ChainId.OPTIMISM_GOERLI]: [
    // "Safe" URLs
    'https://goerli.optimism.io',
  ],
  [ChainId.CELO]: [
    // "Safe" URLs
    `https://forno.celo.org`,
  ],
  [ChainId.CELO_ALFAJORES]: [
    // "Safe" URLs
    `https://alfajores-forno.celo-testnet.org`,
  ],
  [ChainId.BNB]: [
    // "Safe" URLs
    'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
    'https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d',
    'https://1rpc.io/bnb',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://binance.nodereal.io',
    'https://bsc-dataseed4.defibit.io',
    'https://rpc.ankr.com/bsc',
  ],
  [ChainId.AVALANCHE]: [
    // "Safe" URLs
    'http://65.108.204.42:8545',
    // 'https://avalanche-c-chain.publicnode.com',
  ],
  [ChainId.BASE]: [
    // "Safe" URLs
    'https://mainnet.base.org/',
    'https://developer-access-mainnet.base.org/',
    'https://base.gateway.tenderly.co',
    'https://base.publicnode.com',
    // "Fallback" URLs
    'https://1rpc.io/base',
    'https://base.meowrpc.com',
  ],
}

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS = {
  [ChainId.MAINNET]: [
    `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    QUICKNODE_MAINNET_RPC_URL,
    ...FALLBACK_URLS[ChainId.MAINNET],
  ],
  [ChainId.GOERLI]: [`https://goerli.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[ChainId.GOERLI]],
  [ChainId.SEPOLIA]: [`https://sepolia.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[ChainId.SEPOLIA]],
  [ChainId.OPTIMISM]: [`https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[ChainId.OPTIMISM]],
  [ChainId.OPTIMISM_GOERLI]: [
    `https://optimism-goerli.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[ChainId.OPTIMISM_GOERLI],
  ],
  [ChainId.ARBITRUM_ONE]: [
    `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[ChainId.ARBITRUM_ONE],
  ],
  [ChainId.ARBITRUM_GOERLI]: [
    `https://arbitrum-goerli.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[ChainId.ARBITRUM_GOERLI],
  ],
  [ChainId.POLYGON]: [`https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[ChainId.POLYGON]],
  [ChainId.POLYGON_MUMBAI]: [
    `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[ChainId.POLYGON_MUMBAI],
  ],
  [ChainId.CELO]: FALLBACK_URLS[ChainId.CELO],
  [ChainId.CELO_ALFAJORES]: FALLBACK_URLS[ChainId.CELO_ALFAJORES],
  [ChainId.BNB]: [QUICKNODE_BNB_RPC_URL, ...FALLBACK_URLS[ChainId.BNB]],
  [ChainId.AVALANCHE]: [`https://avalanche-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[ChainId.AVALANCHE]],
  [ChainId.BASE]: [`https://base-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[ChainId.BASE]],
}
