import type { Wallet } from '@wallet-standard/standard';
import { CHAIN_ETHEREUM, CHAIN_SOLANA_MAINNET } from '@wallet-standard/util';
import { AbstractWallet } from './abstractWallet';
import type { EthereumWalletAccount } from './ethereumWallet';
import { SignerEthereumWalletAccount } from './ethereumWallet';
import type { SolanaWalletAccount } from './solanaWallet';
import { LedgerSolanaWalletAccount, SignerSolanaWalletAccount } from './solanaWallet';

export type MultiChainWalletAccount = SolanaWalletAccount | EthereumWalletAccount;

export class MultiChainWallet
    extends AbstractWallet<MultiChainWalletAccount>
    implements Wallet<MultiChainWalletAccount>
{
    #name = 'MultiChain Wallet';
    #icon = '';

    get name() {
        return this.#name;
    }

    get icon() {
        return this.#icon;
    }

    constructor() {
        super([
            new SignerSolanaWalletAccount({ chain: CHAIN_SOLANA_MAINNET }),
            new LedgerSolanaWalletAccount({ chain: CHAIN_SOLANA_MAINNET }),
            new SignerEthereumWalletAccount({ chain: CHAIN_ETHEREUM }),
        ]);
    }
}
