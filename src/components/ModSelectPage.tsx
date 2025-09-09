import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Topbar from "./Topbar";

// Ergänze die Props um isAnimating
interface ModSelectPageProps {
    isAnimating?: boolean;
}

function ModSelectPage({ isAnimating = false }: ModSelectPageProps) {
    const [mods, setMods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMods, setSelectedMods] = useState({});
    const [fullyVisible, setFullyVisible] = useState(false);

    useEffect(() => {
        // Setze nach kurzer Verzögerung den Zustand auf vollständig sichtbar
        if (isAnimating) {
            const timer = setTimeout(() => {
                setFullyVisible(true);
            }, 50); // Kleine Verzögerung für besseren Animationseffekt
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    useEffect(() => {
        async function loadMods() {
            try {
                const res = await fetch(
                    "/mods.json"
                );
                const data = await res.json();
                console.log("Loaded mods:", data.mods);
                setMods(data.mods || []);
                
                // Initialize selected state for each mod
                const initialSelectedState = {};
                data.mods.forEach(mod => {
                    initialSelectedState[mod.guid] = false;
                });
                setSelectedMods(initialSelectedState);
            } catch (error) {
                console.error("Error loading mods:", error);
            } finally {
                setLoading(false);
            }
        }
        loadMods();
    }, []);

    const handleModSelection = (guid) => {
        setSelectedMods(prev => ({
            ...prev,
            [guid]: !prev[guid]
        }));
    };

    return (
        <div className="relative flex flex-col min-h-screen h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <img className="w-full h-full object-cover" src="/background.jpg" alt="Background" />
            </div>

            {/* Top-Bar */}
            <Topbar />
            
            <div className={`flex flex-col items-center justify-center h-full transition-transform duration-800 ease-in-out ${isAnimating && !fullyVisible ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className="bg-gray-700 bg-opacity-70 backdrop-blur-md rounded-lg p-8 max-w-5xl w-full text-white flex flex-col h-1/2">
                    {loading ? (
                        <p>Loading Mods...</p>
                    ) : mods.length > 0 ? (
                        <div className="flex flex-col h-full">
                            <div className="overflow-y-auto flex-grow custom-scrollbar pr-4">
                                <Accordion type="multiple" collapsible className="w-full">
                                    {mods.map((mod, index) => (
                                        <AccordionItem key={index} value={`item-${index}`}>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center space-x-2 py-4">
                                                    <Checkbox 
                                                        id={`checkbox-${mod.guid}`} 
                                                        checked={selectedMods[mod.guid]} 
                                                        onCheckedChange={() => handleModSelection(mod.guid)}
                                                    />
                                                    <Label 
                                                        htmlFor={`checkbox-${mod.guid}`}
                                                        className="text-white cursor-pointer"
                                                    >
                                                    </Label>
                                                </div>
                                                <AccordionTrigger className="text-white font-medium flex-1">
                                                    {mod.name || `Mod ${index + 1}`}
                                                </AccordionTrigger>
                                            </div>
                                            <AccordionContent>
                                                <div className="pl-4 text-gray-200">
                                                    {mod.description && <p className="mb-2">{mod.description}</p>}
                                                    {mod.version && <p className="text-sm">Version: {mod.version}</p>}
                                                    {mod.guid && <p className="text-sm text-gray-400">ID: {mod.guid}</p>}
                                                    {mod.dependencies && mod.dependencies.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm font-semibold">Dependencies:</p>
                                                            <ul className="list-disc list-inside text-sm">
                                                                {mod.dependencies.map((dep, depIndex) => (
                                                                    <li key={depIndex}>{dep}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                            
                            <div className="pt-4 mt-auto border-t border-gray-600">
                                <button 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                                    onClick={() => console.log("Selected mods:", Object.keys(selectedMods).filter(guid => selectedMods[guid]))}
                                >
                                    Install Selected Mods
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>No Mods found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModSelectPage;