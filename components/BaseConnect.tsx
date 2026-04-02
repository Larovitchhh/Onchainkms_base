'use client';

import { 
  ConnectWallet, 
  Wallet, 
  ConnectWalletText, 
  WalletDropdown, 
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

export default function BaseConnect() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Wallet>
        <ConnectWallet style={{ 
          backgroundColor: "#38bdf8", 
          color: "black", 
          fontWeight: "bold", 
          padding: "10px 20px", 
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Avatar style={{ height: "24px", width: "24px" }} />
          <Name />
          <ConnectWalletText>Connect to Base</ConnectWalletText>
        </ConnectWallet>
        
        <WalletDropdown style={{ backgroundColor: "#1e293b", color: "white" }}>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect style={{ color: "#f87171", padding: "10px" }} />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
