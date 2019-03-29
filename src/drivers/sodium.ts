import * as sodium from 'sodium-native';

export const name = 'sodium';

export function generate(seed) {
    const publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
    const secretKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);
    sodium.crypto_sign_seed_keypair(publicKey, secretKey, seed);
    return publicKey;
}

export function sign(secretKey, message) {
    const signature = Buffer.alloc(sodium.crypto_sign_BYTES);
    sodium.crypto_sign_detached(signature, message, secretKey);
    return signature;
}

export function verify(publicKey, message, signature) {
    return sodium.crypto_sign_verify_detached(signature, message, publicKey);
}
