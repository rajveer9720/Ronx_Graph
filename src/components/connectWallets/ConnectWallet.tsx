import { useWeb3 } from '../../hooks/useWeb3';

const ConnectWallet = () => {
  const { account, connectWallet } = useWeb3();

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
