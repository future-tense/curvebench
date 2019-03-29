import { eddsa } from 'elliptic';

const ec = new eddsa('ed25519');

export const name = 'elliptic';

export function generate(seed) {
    const key = ec.keyFromSecret(seed);
    return Buffer.from(key.getPublic());
}

export function sign(secretKey, message) {
    const sk = secretKey.slice(0, 32);
    const pk = secretKey.slice(32, 64);
    const key = ec.keyFromSecret(sk);
    key._pubBytes = Array.from(pk);
    return Buffer.from(key.sign(message).toBytes());
}

export function verify(publicKey, message, signature) {
    return ec.verify(
        message,
        Array.from(signature),
        Array.from(publicKey)
    );
}
