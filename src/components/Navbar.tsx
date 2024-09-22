import { FaHistory } from "react-icons/fa";
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <WalletModalProvider>
      <div className="p-3 flex flex-row justify-between items-center">
        <div>
          <h1
            className="text-blue-500 font-bold text-3xl cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            SolTip
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-slate-300 hover:text-white cursor-pointer text-3xl p-2 mx-3">
            <FaHistory />
          </div>
          <div>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </WalletModalProvider>
  );
}

export default Navbar;
