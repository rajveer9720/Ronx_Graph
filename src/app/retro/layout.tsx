import RetroLayout from '@/layouts/retro/layout';
import { WalletProvider } from '@/components/nft/WalletContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <RetroLayout>{children}</RetroLayout>
    </WalletProvider>
  );
}
