'use client';

import { 
  ConnectWallet, 
  Wallet, 
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
        <ConnectWallet>
          <Avatar />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity hasCopyAddressOnClick>
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
