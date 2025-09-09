import React, { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import ModSelectPage from "./ModSelectPage";
import Topbar from "./Topbar";

interface ChangelogEntry {
    version: string;
    changes: string[];
}

function InstallPage() {
    // State zum Tracken der verfügbaren Höhe
    const [maxChangelogHeight, setMaxChangelogHeight] = useState("12rem");
    // State für den Animationsstatus
    const [isInstalling, setIsInstalling] = useState(false);
    // State für die neue Seite
    const [showModSelectPage, setShowModSelectPage] = useState(false);
    // State für Animation der ModSelectPage
    const [isModSelectFadingIn, setIsModSelectFadingIn] = useState(false);

    const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);

    // Fetch Changelog from JSON file
    useEffect(() => {
        async function fetchChangelog() {
            try {
                const response = await fetch('/Changelog.json');
                const data = await response.json();
                setChangelog(data.changelog || []);
            } catch (error) {
                console.error("Error fetching changelog:", error);
            }
        }
        fetchChangelog();
    }, []);
    
    // Berechnen der verfügbaren Höhe für das Changelog basierend auf der Fenstergröße
    useEffect(() => {
        const calculateHeight = () => {
            const windowHeight = window.innerHeight;
            // Passe die Höhe des Changelogs basierend auf der Fensterhöhe an
            // Ziehe die Höhe der anderen Komponenten ab (Header, Logo, Button, Abstände)
            const estimatedOtherElementsHeight = 380; // Header + Logo + Button + Margins (verringert)
            const availableHeight = windowHeight - estimatedOtherElementsHeight;
            // Setze eine Mindesthöhe von 80px und maximal die verfügbare Höhe
            const newHeight = Math.max(80, Math.min(availableHeight, 300));
            setMaxChangelogHeight(`${newHeight}px`);
        };
        
        // Initial berechnen und bei Fenstergrößenänderung aktualisieren
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);

    // Handler für den Install-Button
    const handleInstallClick = () => {
        setIsInstalling(true);
        
        // Nach der Animation die neue Seite anzeigen
        setTimeout(() => {
            setIsModSelectFadingIn(true);
            setShowModSelectPage(true);
        }, 800); // 800ms = Dauer der Animation
    };

    // Zeige die Installation-Progress-Page an, wenn die Animation abgeschlossen ist
    if (showModSelectPage) {
        return <ModSelectPage isAnimating={isModSelectFadingIn} />;
    }

    return (
        <div className="relative flex flex-col min-h-screen h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <img className="w-full h-full object-cover" src="/background.jpg" alt="Background" />
            </div>

            {/* Top-Bar */}
            <Topbar isAnimating={isInstalling} />

            {/* Hauptinhalt - mit reduziertem Abstand für den fixierten Button am Ende */}
            <div className={`flex flex-col mt-16 mb-16 z-10 transition-transform duration-800 ease-in-out ${isInstalling ? '-translate-x-full' : ''}`}>
                {/* Logo - Angepasste Größe */}
                <div className="flex justify-center mb-3">
                    <img className="p-3 max-h-48 w-auto object-contain" src="/subnautica-logo-snr.png" alt="Installation" />
                </div>

                {/* Changelog - Angepasste Höhe und responsives Design */}
                <div className="flex flex-col items-center px-4">
                    <div className="bg-gray-700 bg-opacity-70 backdrop-blur-md rounded-lg p-3 max-w-5xl w-full">
                        <h2 className="text-lg font-bold mb-1 text-center">Changelogs</h2>
                        <div 
                            className="overflow-y-auto custom-scrollbar"
                            style={{ maxHeight: maxChangelogHeight }}
                        >
                            {changelog.length > 0 ? (
                                changelog.map((entry, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-md font-semibold mb-1">Version {entry.version}</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {entry.changes.map((change, changeIndex) => (
                                                <li key={changeIndex} className="bg-gray-600 p-2 rounded-2xl mr-3 my-2">
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-300 py-2">Loading changelog...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Install-Button - Näher am Changelog positioniert */}
            <div className={`fixed bottom-3 left-0 right-0 flex justify-center z-30 transition-transform duration-800 ease-in-out ${isInstalling ? '-translate-x-full' : ''}`}>
                <button 
                    onClick={handleInstallClick}
                    className="w-3xs text-center bg-gray-500 cursor-pointer text-white flex items-center justify-center gap-x-2 p-2 rounded hover:bg-green-600 transition-colors duration-200 ease-in-out shadow-lg"
                >
                    <MdFileDownload className="text-2xl" />
                    <span>Start Installation</span>
                </button>
            </div>
        </div>
    );
}

export default InstallPage;