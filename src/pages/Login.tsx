import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      // toast.success("wallet Connected");
      navigate("/");
    }
  }, [connected]);

  function reload() {
    window.location.reload();
  }
  return (
    <WalletModalProvider>
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <div className="flex flex-col items-center justify-between h-[300px] space-y-6">
          <div>
            <h1 className="text-blue-500 text-4xl lg:text-5xl py-1 font-semibold">
              Connect your wallet
            </h1>
            <h1 className="text-white text-center">
              Join the tipping revolution!
            </h1>
          </div>
          <div className="flex flex-col w-full items-center">
            <WalletMultiButton />
            <br />
            <div className="text-slate-300">
              Taking long to connect{" "}
              <span
                className="text-white font-semibold cursor-pointer"
                onClick={reload}
              >
                click here
              </span>
            </div>
          </div>
        </div>
      </div>
    </WalletModalProvider>
  );
}

export default Login;
