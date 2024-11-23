import MinimalLayout from '@/layouts/minimal/layout';
import { WalletProvider } from '@/app/context/WalletContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      {typeof window === 'undefined' ? (
        // Fallback rendering for SSR
        <MinimalLayout>
          <div>Loading...</div>
        </MinimalLayout>
      ) : (
        <MinimalLayout>{children}</MinimalLayout>
      )}
    </WalletProvider>
  );
}
