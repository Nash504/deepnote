'use client'
import { Card } from "./ui/card";
import { useState, useEffect, useRef } from "react";

export default function NeonBento() {
    // Ref to track the component's container element
    const bentoRef = useRef(null);
    // State to control the animation visibility
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Create an Intersection Observer to detect when the component is visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the component is at least 20% visible, trigger the animation
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once triggered, we can disconnect the observer
                    observer.disconnect();
                }
            },
            {
                // Trigger when at least 20% of the element is visible
                threshold: 0.2
            }
        );
        
        // Start observing the component
        if (bentoRef.current) {
            observer.observe(bentoRef.current);
        }
        
        // Clean up the observer when the component unmounts
        return () => {
            if (bentoRef.current) {
                observer.unobserve(bentoRef.current);
            }
        };
    }, []);

    return (
        // Outer container with padding and margin
        <div className="bg-white p-4 sm:p-8 mt-6" ref={bentoRef}>
            {/* Main Card acting as the Bento Grid container */}
            <Card className={`max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-black rounded-lg transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>

                {/* Top Row - Left Card */}
                <Card className={`bg-lime-300 sm:col-span-2 p-6 sm:p-24 flex items-center justify-center rounded-lg border-lime-300 transition-all duration-500 delay-100 hover:scale-[1.02] ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-4'}`}>
                     <p className="font-bold text-black text-center text-lg sm:text-xl">
                        YOUR MAIN<br/>FEATURE TEXT HERE
                    </p>
                </Card>

                {/* Top Row - Right Card */}
                <Card className={`bg-lime-300 col-span-1 p-6 sm:p-24 flex items-center justify-center rounded-lg border-lime-300 transition-all duration-500 delay-200 hover:scale-[1.02] ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-x-4'}`}>
                     {/* Content for this card */}
                </Card>

                {/* Bottom Row - Left Card */}
                <Card className={`bg-neutral-900 col-span-1 p-6 sm:p-24 flex items-center justify-center rounded-lg border-neutral-900 transition-all duration-500 delay-300 hover:scale-[1.02] ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
                    <p className="font-bold text-lime-300 text-center text-lg sm:text-xl transition-all duration-300 hover:text-white group-hover:text-white">
                        THROW SOME<br />NEON GREEN<br />TEXT IN HERE
                    </p>
                </Card>

                {/* Bottom Row - Right Card */}
                <Card className={`bg-neutral-900 sm:col-span-2 p-4 sm:p-6 flex flex-col space-y-4 sm:space-y-6 rounded-lg border-neutral-900 transition-all duration-500 delay-400 hover:scale-[1.01] ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                    {/* Content for figures/items */}
                    <div className="text-white font-bold text-lg sm:text-xl transition-all duration-300 hover:text-lime-300">COOL FIGURE</div>
                    <div className="h-px bg-lime-300 w-full transition-all duration-500 hover:w-full origin-left"></div> {/* Divider line */}
                    <div className="text-white font-bold text-lg sm:text-xl transition-all duration-300 hover:text-lime-300">ANOTHER FIGURE</div>
                </Card>

            </Card>
        </div>
    );
}