function ModSelectPage() {
    return (
        <div className="relative flex flex-col min-h-screen h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <img className="w-full h-full object-cover" src="/background.jpg" alt="Background" />
            </div>
            
            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-gray-700 bg-opacity-70 backdrop-blur-md rounded-lg p-8 max-w-5xl w-full">
                    
                </div>
            </div>
        </div>
    );
}

export default ModSelectPage;