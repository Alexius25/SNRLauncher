import React from "react";
import { FaDownload } from "react-icons/fa6";

function InstallPage() {
    return (
        <div className="flex flex-col h-screen">
            {/* Bild immer oben */}
            <div className="flex justify-center">
                <img className="p-6" src="/public/subnautica-logo-snr.png" alt="Installation" />
            </div>

            {/* Button immer unten */}
            <div className="flex flex-col items-center mt-auto mb-6">
                <button className="bg-green-500 text-center flex items-center gap-x-2 p-2 rounded">
                    <FaDownload />
                    <span>Install</span>
                </button>
            </div>
        </div>
    );
}

export default InstallPage;