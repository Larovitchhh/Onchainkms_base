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
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2">
          <Avatar className="h-6 w-6" />
          <Name />
          <ConnectWalletText>Connect to Base</ConnectWalletText>
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
