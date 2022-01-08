import web3 = require("@solana/web3.js");
import BN = require("bn.js");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// TODO: Pull these vaules from the environment
// Never ever do this in production.
const key: Uint8Array = Uint8Array.from([
  41, 150, 189, 151, 186, 251, 180, 2, 216, 168, 213, 96, 196, 31, 201, 218, 37,
  70, 50, 1, 104, 168, 54, 61, 232, 9, 157, 140, 22, 169, 56, 118, 117, 68, 107,
  217, 27, 125, 186, 140, 104, 142, 61, 143, 116, 146, 47, 153, 1, 178, 134,
  228, 127, 247, 243, 165, 52, 247, 61, 113, 241, 46, 226, 59,
]);
const Contractkey: Uint8Array = Uint8Array.from([
  27, 124, 69, 164, 113, 178, 185, 85, 166, 149, 2, 33, 39, 37, 157, 38, 89, 75,
  73, 28, 117, 219, 237, 56, 110, 221, 72, 163, 174, 111, 246, 223, 84, 202,
  135, 29, 174, 232, 89, 23, 180, 18, 1, 179, 233, 32, 89, 100, 240, 223, 145,
  157, 175, 179, 152, 234, 6, 187, 179, 171, 244, 155, 73, 30,
]);
const programId = new web3.PublicKey(
  "6hzN4syXZ8cZBPjUDpoadtbBntJB9GkcFZiD4jwdPRwK"
);
async function main() {
  const signer: web3.Keypair = web3.Keypair.fromSecretKey(key);
  // await connection.getBalance(signer.publicKey).then(balance => {
  //     console.log("SOL: ", balance / web3.LAMPORTS_PER_SOL);
  // })

  const data: Buffer = Buffer.from(
    Uint8Array.of(0, ...new BN(44).toArray("le", 8))
  );
  const transaction = new web3.Transaction().add(
    new web3.TransactionInstruction({
      keys: [],
      programId,
      data,
    })
  );

  await web3
    .sendAndConfirmTransaction(connection, transaction, [signer])
    .then((sig) => {
      console.log("sig: ", sig);
    });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
