import * as React from 'react';
import { llamapayABI } from 'utils/contract';
import { useContract, useSigner } from 'wagmi';

interface CancelProps {
  contractAddress: string;
  payee: string;
  amtPerSec: number;
}

export const Cancel = ({ contractAddress, payee, amtPerSec }: CancelProps) => {
  const [{ data: signerData }] = useSigner();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: llamapayABI,
    signerOrProvider: signerData,
  });

  const onCancel = React.useCallback(() => {
    async function cancelStream() {
      try {
        await contract.cancelStream(payee, amtPerSec);
      } catch {}
    }
    cancelStream();
  }, [contract, amtPerSec, payee]);

  return (
    <>
      <button onClick={onCancel} className="rounded-lg bg-zinc-200 p-1 text-sm dark:bg-zinc-700">
        Cancel
      </button>
    </>
  );
};
