import { ed25519 } from '@futuretense/ed25519-dalek';

export const name = 'dalek';

export function generate(seed) {
    return ed25519.generatePublicKey(seed);
}

export function sign(secretKey, message) {
    const sk = secretKey.slice(0, 32);
    const pk = secretKey.slice(32, 64);
    return ed25519.sign(sk, pk, message);
}

export function verify(publicKey, message, signature) {
    return ed25519.verify(publicKey, message, signature);
}
