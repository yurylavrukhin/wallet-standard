import { initialize } from '@wallet-standard/app';
import type { WalletAccount } from '@wallet-standard/standard';
import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { WalletsContext } from './useWallets.js';

/** TODO: docs */
export interface WalletsProviderProps {
    children: NonNullable<ReactNode>;
}

/** TODO: docs */
export const WalletsProvider: FC<WalletsProviderProps> = ({ children }: WalletsProviderProps) => {
    // Synchronously get the wallets that have registered already so that they can be accessed on the first render.
    const [wallets, setWallets] = useState(() => initialize<WalletAccount>().get());

    useEffect(() => {
        const destructors: (() => void)[] = [];
        const wallets = initialize<WalletAccount>();

        // Get and set the wallets that have been registered already, in case they changed since the state initializer.
        setWallets(wallets.get());

        // Add an event listener to add any wallets that are registered after this point.
        destructors.push(wallets.on('register', (registered) => setWallets((wallets) => wallets.concat(registered))));

        // Add an event listener to remove any wallets that are unregistered after this point.
        destructors.push(
            wallets.on('unregister', (unregistered) =>
                setWallets((wallets) => wallets.filter((wallet) => unregistered.includes(wallet)))
            )
        );

        return () => destructors.forEach((destroy) => destroy());
    }, []);

    return <WalletsContext.Provider value={{ wallets }}>{children}</WalletsContext.Provider>;
};
