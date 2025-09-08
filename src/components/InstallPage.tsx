import React from "react";
import { MdFileDownload } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

function InstallPage() {
    return (
        <div className="relative flex flex-col h-screen">
        {/* Background Image */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <img className="w-full h-full object-cover" src="/background.jpg" alt="Background" />
            </div>

            {/* Top-Bar */}
            <div className="fixed top-2 left-0 right-0 w-[95%] h-12 bg-gray-600 z-10 flex justify-between items-center px-4 shadow-3xl mx-auto rounded-lg">
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

            {/* Logo */}
            <div className="flex justify-center z-10 mt-8">
                <img className="p-6" src="/subnautica-logo-snr.png" alt="Installation" />
            </div>

            {/* Changelog */}
            <div className="flex flex-col items-center mt-4 px-4 z-10">
                <div className="bg-gray-700 bg-opacity-70 backdrop-blur-md rounded-lg p-4 max-w-5xl w-full">
                    <h2 className="text-2xl font-bold mb-2 text-center">ChangeLog</h2>
                    <ul className="list-disc list-inside space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Added new features to enhance user experience.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Improved performance and stability.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Fixed bugs reported in the previous version.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Updated dependencies to the latest versions.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Enhanced security measures.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Enhanced security measures.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Enhanced security measures.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Enhanced security measures.</li>
                        <li className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">Enhanced security measures.</li>
                    </ul>
                </div>
            </div> 

            {/* Install-Button */}
            <div className="flex flex-col items-center mt-auto mb-6 z-10">
                <button className="w-3xs text-center bg-gray-500 cursor-pointer text-white flex items-center justify-center gap-x-2 p-2 rounded hover:bg-green-600 transition-colors duration-200 ease-in-out">
                    <MdFileDownload className="text-2xl" />
                    <span>Start Installation</span>
                </button>
            </div>
        </div>
    );
}

export default InstallPage;