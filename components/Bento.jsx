import { BentoGrid } from "./magicui/bento-grid"; // Still imported, though not used in this specific component's output
import { Database, Code, Search, Lightbulb } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";

export default function Bento() {
    return (
        <div className="bg-white p-8x mt-6">
            <div className="max-w-4xl mx-auto">
                {/* Main container with black background - NOW THE TARGET FOR BORDERBEAM */}
                {/* Added 'relative' positioning for BorderBeam to work correctly */}
                <div className="relative bg-black p-10 rounded-3xl">
                    {/* Top row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* Left item (2/3 width) */}
                        <div className="col-span-2 bg-lime-300 rounded-2xl p-8 flex flex-col items-center justify-center">
                            <Code className="h-8 w-8 text-black mb-4" />
                            <h2 className="text-black font-bold text-xl text-center">MODERN WEB DEVELOPMENT STACK</h2>
                        </div>
                        
                        {/* Right item (1/3 width) */}
                        <div className="col-span-1 bg-lime-300 rounded-2xl p-8 flex flex-col items-center justify-center">
                            <Lightbulb className="h-8 w-8 text-black mb-4" />
                            <h2 className="text-black font-bold text-center">REACT & NEXT.JS</h2>
                        </div>
                    </div>

                    {/* Bottom row */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Left item (1/3 width) */}
                        <div className="col-span-1 bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center">
                            <Code className="h-8 w-8 text-lime-300 mb-4" />
                            <h3 className="text-lime-300 font-bold text-center">
                                FULL STACK DEVELOPMENT
                            </h3>
                        </div>
                        
                        {/* Right item (2/3 width) */}
                        <div className="col-span-2 bg-gray-800 rounded-2xl p-8">
                            <h3 className="text-white font-bold text-center mb-6">RAG ARCHITECTURE</h3>
                            
                            {/* Green divider line */}
                            <div className="h-1 bg-lime-300 w-full my-6"></div>
                            
                            <div className="flex items-center justify-center mt-6 gap-12">
                                <div className="flex flex-col items-center">
                                    <Database className="h-6 w-6 text-white mb-4" />
                                    <h3 className="text-white font-bold text-center">VECTOR DATABASE</h3>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                    <Search className="h-6 w-6 text-lime-300 mb-4" />
                                    <h3 className="text-lime-300 font-bold text-center">RETRIEVAL</h3>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                    <Lightbulb className="h-6 w-6 text-white mb-4" />
                                    <h3 className="text-white font-bold text-center">AI GENERATION</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* BorderBeam is now inside the black container it should apply to */}
                    <BorderBeam duration={90} size={100} />
                </div>
            </div>
        </div>
    );
}