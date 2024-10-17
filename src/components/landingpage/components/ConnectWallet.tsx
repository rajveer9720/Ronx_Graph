// ConnectWallet.tsx
"use client"
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ethers } from 'ethers';

interface ConnectWalletProps {
    onConnect: (address: string, balance: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Button handler for connecting to the wallet
    const handleConnect = async () => {
        if (window.ethereum) {
            try {
                setLoading(true);
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const address = accounts[0];
                const balance = await getBalance(address);
                onConnect(address, balance);
            } catch (error) {
                console.error("Connection error:", error);
                alert("Failed to connect to wallet.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please install the MetaMask extension!");
        }
    };

    // Function to get the balance of the connected wallet
    const getBalance = async (address: string) => {
        try {
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [address, "latest"],
            });
            return ethers.utils.formatEther(balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
            setError("Failed to retrieve balance.");
            return null;
        }
    };

    return (
        <Card className="text-center">
            <Card.Body>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <Button onClick={handleConnect} variant="primary" disabled={loading}>
                    {loading ? "Connecting..." : "Connect to Wallet"}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ConnectWallet;
