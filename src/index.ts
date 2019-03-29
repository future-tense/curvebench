import 'console.table';
import { performance } from 'perf_hooks';

import * as sodium from './drivers/sodium';
import * as elliptic from './drivers/elliptic';
import * as tweetnacl from './drivers/tweetnacl';
import * as dalek from './drivers/dalek';
import * as ed25519 from './drivers/ed25519';

function generate(drivers, seed, numLoops) {

    const row = {
        function: 'generate'
    };

    for (const driver of drivers) {
        const func = driver.generate;
        const t0 = performance.now();
        for (let i = 0; i < numLoops; i++) {
            func(seed);
        }
        const delta = performance.now() - t0;
        row[driver.name] = delta.toFixed(3);
    }

    return row;
}

function sign(drivers, secretKey, message, numLoops) {

    const row = {
        function: 'sign'
    };

    for (const driver of drivers) {
        const func = driver.sign;
        const t0 = performance.now();
        for (let i = 0; i < numLoops; i++) {
            func(secretKey, message);
        }
        const delta = performance.now() - t0;
        row[driver.name] = delta.toFixed(3);
    }

    return row;
}

function verify(drivers, publicKey, message, signature, numLoops) {

    const row = {
        function: 'verify'
    };

    for (const driver of drivers) {

        const func = driver.verify;
        const t0 = performance.now();
        for (let i = 0; i < numLoops; i++) {
            func(publicKey, message, signature);
        }
        const delta = performance.now() - t0;
        row[driver.name] = delta.toFixed(3);
    }

    return row;
}

// -----------------------------------------------------------------------------

const seed = Buffer.from('1123740522f11bfef6b3671f51e159ccf589ccf8965262dd5f97d1721d383dd4', 'hex');
const publicKey = sodium.generate(seed);
const secretKey = Buffer.concat([seed, publicKey]);

const message = Buffer.from('82011436ee159cf44c30e749288989ce10f6062cd1b75eefb94bd574a122a79c', 'hex');
const signature = sodium.sign(secretKey, message);

// -----------------------------------------------------------------------------

const nativeDrivers = [ed25519, sodium, dalek];
const nativeIterations = 1000000;

console.log(`Native bindings, ${nativeIterations} iterations:\n`);
console.table([
    generate(nativeDrivers, seed, nativeIterations),
    sign(nativeDrivers, secretKey, message, nativeIterations),
    verify(nativeDrivers, publicKey, message, signature, nativeIterations)
]);

const jsDrivers = [tweetnacl, elliptic];
const jsIterations = 10000;

console.log(`Pure javascript, ${jsIterations} iterations:\n`);
console.table([
    generate(jsDrivers, seed, jsIterations),
    sign(jsDrivers, secretKey, message, jsIterations),
    verify(jsDrivers, publicKey, message, signature, jsIterations)
]);
