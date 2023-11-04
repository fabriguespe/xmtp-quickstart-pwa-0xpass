import React, { useState, useEffect } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import { ConnectButton } from "0xpass";
import { useUser } from "0xpass";
import { useAccount, useWalletClient } from "wagmi";
import { disconnect } from "@wagmi/core";

const Page = () => {
  const { data: walletClient } = useWalletClient();
  const { address, isDisconnected, isConnecting, isConnected, status } =
    useAccount();
  const { getUser, loading } = useUser();
  const [loggingOut, setLoggingOut] = useState(false); // Add this line

  const handleLogout = async () => {
    setLoggingOut(true);
    await disconnect();
    console.log("Logging out...");
    setLoggingOut(false);
  };

  useEffect(() => {
    if (isDisconnected) {
      console.log("isDisconnected", isDisconnected);
    }
    if (address) {
      console.log("address", address);
    }
    if (walletClient) {
      console.log("walletClient", walletClient);
    }
    if (getUser) {
      console.log("getUser", getUser);
    }
    if (isConnected) {
      console.log("isConnected", isConnected);
    }
    if (isConnecting) {
      console.log("isConnecting", isConnecting);
    }
    if (status) {
      console.log("status", status);
    }
  }, [
    isDisconnected,
    address,
    walletClient,
    isConnecting,
    status,
    isConnected,
  ]);

  const isPWA = true;
  const styles = {
    uContainer: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: isPWA == true ? "0px" : "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: isPWA == true ? "20px" : "10px",
      borderRadius: "5px",
      fontSize: isPWA == true ? "20px" : "14px", // Increased font size
    },
  };

  return (
    <div style={styles.uContainer}>
      {isDisconnected && (
        <div style={styles.xmtpContainer}>
          <ConnectButton />
        </div>
      )}
      {!isDisconnected && walletClient && (
        <FloatingInbox
          isPWA={isPWA}
          wallet={walletClient}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Page;
