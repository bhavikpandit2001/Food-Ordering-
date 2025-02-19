"use client";

import { useRouter } from "next/navigation";
import Footer from "./_components/common/Footer";
import CustomerHeader from "./_components/customer/CustomerHeader";

export default function Home() {
  const router = useRouter();

  return (
    <main >
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
      </div>
      <Footer />
    </main>
  );
}
