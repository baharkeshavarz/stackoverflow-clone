import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";

interface layoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        LestSidebar
        <section className="max-md:pb-14 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RightSidebar
      </div>
      Toaster
    </main>
  );
};

export default Layout;
