import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function ModSelectPage() {

    const [mods, setMods] = useState([]);

    useEffect(() => {
        // Fetch the mods from the JSON file in the Repository
        async function loadMods() {
            try {
                const res = await fetch(
                    "https://raw.githubusercontent.com/Alexius25/SNRLauncher/main/mods.json"
                )
                const data = await res.json();
                setMods(data.mods);
            } catch (error) {
                console.error("Error loading mods:", error);
            }
        }
        loadMods();
    }, []);

    return (
        <div className="relative flex flex-col min-h-screen h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <img className="w-full h-full object-cover" src="/background.jpg" alt="Background" />
            </div>
            
            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-gray-700 bg-opacity-70 backdrop-blur-md rounded-lg p-8 max-w-5xl w-full">
                    <Accordion type="single" collapsible className="w-full">
                        {mods.map((mod, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{mod.name || `Mod ${index + 1}`}</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        {mod.description && <p>{mod.description}</p>}
                                        {mod.version && <p>Version: {mod.version}</p>}
                                        {/* Fügen Sie hier weitere Mod-Eigenschaften hinzu */}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default ModSelectPage;