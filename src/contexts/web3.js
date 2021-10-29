import { createContext, useEffect, useState } from "react";

const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setSelectedAccount(accounts[0]);
    } else {
      alert("Connection Failed");
    }
  };

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setSelectedAccount(accounts[0]);

        window.ethereum.on("accountsChanged", (accounts) => {
          setSelectedAccount(accounts[0]);
          console.log(window.ethereum.selectedAddress);
        });
      }
    })();
  }, []);

  return (
    <Web3Context.Provider value={{ selectedAccount, connectAccount }}>
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Context, Web3Provider };
