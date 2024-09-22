import { Connection, PublicKey } from "@solana/web3.js";

export async function getWalletBalance(publicKeyString: string) {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  try {
    const publicKey = new PublicKey(publicKeyString);
    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / 1_000_000_000;
    console.log(`Balance: ${balanceInSol} SOL`);
    const balanceInSolinstr = balanceInSol.toString();
    return balanceInSolinstr;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}

export async function getusdbalance(balace: number) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const data = await response.json();
    const solPrice = data.solana.usd;
    return balace * solPrice;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    return null;
  }
}
