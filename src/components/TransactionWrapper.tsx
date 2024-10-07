'use client';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import { type Address, encodeFunctionData } from 'viem';
import {
  BASE_CHAIN_ID,
  smartTokenAbi,
  smartTokenAddress,
} from '../constants';

export default function TransactionWrapper({ address }: { address: Address }) {
  const prepareClaimCall = {
    to: smartTokenAddress as Address,
    data: encodeFunctionData({
      abi: smartTokenAbi,
      functionName: 'prepapreClaim', // Typo in the function name is expected
      args: [],
    }),
  };
  const claimCall = {
    to: smartTokenAddress as Address,
    data: encodeFunctionData({
      abi: smartTokenAbi,
      functionName: 'claim',
      args: [],
  })
  };

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        calls={[prepareClaimCall, claimCall]}
        className="w-[450px]"
        chainId={BASE_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
