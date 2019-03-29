import * as ed25519 from 'ed25519';

export const name = 'ed25519';

export function generate(seed) {
    return ed25519.MakeKeypair(seed).publicKey;
}

export function sign(secretKey, message) {
    return ed25519.Sign(message, secretKey);
}

export function verify(publicKey, message, signature) {
    return ed25519.Verify(message, signature, publicKey);
}
