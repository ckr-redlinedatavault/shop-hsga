import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";

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
        </>
    );
}
