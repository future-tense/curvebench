import * as nacl from 'tweetnacl';

export const name = 'tweetnacl';

export function generate(seed) {
    const seedUint8 = new Uint8Array(seed);
    const naclKeys = nacl.sign.keyPair.fromSeed(seedUint8);
    return Buffer.from(naclKeys.publicKey);
}

export function sign(secretKey, message) {
    const data = new Uint8Array(message);
    return Buffer.from(nacl.sign.detached(data, secretKey));
}

export function verify(publicKey, message, signature) {
    const data = new Uint8Array(message);
    return nacl.sign.detached.verify(data, signature, publicKey);
}
