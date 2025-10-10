import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f5ece3] to-[#e8d6c7] text-gray-900">
      {/* Left Panel - Logo */}
      <div className="hidden lg:flex flex-col justify-center items-center w-5/12 bg-white/60 backdrop-blur-md border-r border-white/40 shadow-inner relative">
        <div className="flex flex-col items-center text-center space-y-4 px-6">
          <Link href="/">
            <img
              src="/logo_1.svg"
              alt="Thirumeni Traders Logo"
              className="w-72 h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </Link>

          <div>
            <h1 className="text-2xl font-extrabold tracking-[0.15em] text-gray-800">
              THIRUMENI TRADERS
            </h1>
            <p className="text-sm text-gray-600 mt-1 tracking-wide">
              Kerala E-Rituals | Products & Services
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Card */}
      <div className="flex flex-1 justify-center items-center px-4 sm:px-8">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8 border border-gray-100 sm:p-10 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
