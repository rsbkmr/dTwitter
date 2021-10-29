import { useContext } from "react";
import { Web3Context } from "../contexts/web3";

const Navbar = () => {
  const { selectedAccount, connectAccount } = useContext(Web3Context);
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid" style={{ maxWidth: "40rem" }}>
        <a className="navbar-brand" href="/">
          dTwitter
        </a>
        <div className="d-flex">
          {selectedAccount ? (
            <span className="navbar-text">{selectedAccount}</span>
          ) : (
            <button
              className="btn btn-outline-primary"
              onClick={connectAccount}
            >
              Connect Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
