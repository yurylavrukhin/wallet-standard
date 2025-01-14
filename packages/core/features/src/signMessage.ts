import type { AsyncMapFunction } from '@wallet-standard/types';

/**
 * TODO: docs
 * Instantiation expression -- https://github.com/microsoft/TypeScript/pull/47607
 */
export declare const signMessageMethod: AsyncMapFunction<SignMessageInput, SignMessageOutput>;

/** TODO: docs */
export type SignMessageMethod = typeof signMessageMethod;

/** TODO: docs */
export type SignMessageFeature = Readonly<{
    /** Namespace for the feature. */
    signMessage: {
        /** Version of the feature API. */
        version: '1.0.0';

        /** Sign messages (arbitrary bytes) using the account's secret key. */
        signMessage: SignMessageMethod;
    };
}>;

/** Input for signing a message. */
export type SignMessageInput = Readonly<{
    /** Message to sign, as raw bytes. */
    message: Uint8Array;
}>;

/** Output of signing a message. */
export type SignMessageOutput = Readonly<{
    /** TODO: docs */
    signedMessage: Uint8Array;

    /** TODO: docs */
    signature: Uint8Array;
}>;
