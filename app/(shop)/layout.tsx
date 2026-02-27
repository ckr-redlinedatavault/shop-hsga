import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import BottomBanner from "@/components/BottomBanner";
import Footer from "@/components/Footer";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TopBanner />
            <Navbar />
            {children}
            <Footer />
            <BottomBanner />
        </>
    );
}
