import React from "react";
import { FaDiscord } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

interface TopbarProps {
  isAnimating?: boolean;
}

function Topbar({ isAnimating = false }: TopbarProps) {
  return (
    <div className="fixed top-6 left-0 right-0 w-[95%] h-12 bg-gray-600 z-20 flex justify-between items-center px-4 shadow-3xl mx-auto rounded-lg">
      {/* Logo left */}
      <a href="https://369studios.tech/" target="_blank" className="p-1 rounded-full transition-colors duration-200 ease-in-out cursor-pointer hover:bg-white/10 flex items-center justify-center">
        <img className="h-8 rounded-full" src="/SNR.jpg" alt="Logo" />
      </a>

      {/* Buttons right */}
      <div className="flex space-x-2">
        <a href="https://discord.gg/cnErGuf6UT" target="_blank" className="text-2xl p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer hover:bg-white/10 flex items-center justify-center">
          <FaDiscord />
        </a>
        <a href="https://github.com/369-Studios" target="_blank" className="text-2xl p-2 rounded-full transition-colors duration-200 ease-in-out cursor-pointer hover:bg-white/10 flex items-center justify-center">
          <IoLogoGithub />
        </a>
      </div>
    </div>
  );
}

export default Topbar;