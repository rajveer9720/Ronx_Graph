import cn from 'classnames';
import Sidebar from '@/layouts/sidebar/_retro-left';
import { RetroHeader } from '@/layouts/header/header';
import Footer from '@/components/landingpage/components/Footer';
import retrobg from '@/assets/images/retro-bg.png';
import { WalletProvider } from '@/app/context/WalletContext';

export default function RetroLayout({
  children,
  contentClassName,
}: React.PropsWithChildren<{ contentClassName?: string }>) {
  return (
    <>
    <WalletProvider>
      <RetroHeader className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-[320px] rtl:2xl:pr-[320px] ltr:3xl:pl-80 rtl:3xl:pr-80 bg-gradient-to-r from-black via-gray-900 to-blue-900" />
      <Sidebar className="z-40 hidden xl:block" />
      <main
        className={cn(
          "min-h-[100vh] pb-16 pt-4 sm:pb-20 bg-gradient-to-r from-black via-gray-900 to-blue-900 rtl:lg:pl-80 xl:pb-24 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80 3xl:pt-0.5",
          contentClassName
        )}
        style={{
          backgroundImage: `url(${retrobg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 3xl:px-10">{children}</div>
      </main>
      <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-[320px] rtl:2xl:pr-[320px] ltr:3xl:pl-80 rtl:3xl:pr-80 bg-gradient-to-r from-black via-gray-900 to-blue-900">
        <Footer />
      </div>
      </WalletProvider>
    </>
  );
}