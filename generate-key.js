import { generateKeyPairSync } from "crypto";

const { publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "der",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

const base64Key = publicKey.toString("base64");
console.log(base64Key);
