import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Buffer } from "buffer";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <ConnectionProvider endpoint="https://api.devnet.solana.com">
    <WalletProvider wallets={wallets} autoConnect>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletProvider>
  </ConnectionProvider>
);
