'use client'
import { Card } from "./ui/card";
import { useState, useEffect, useRef } from "react";

export default function NeonBento() {
    // Ref to track the component's container element that triggers the animation
    const bentoRef = useRef(null);
    // State to control the animation visibility
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Create an Intersection Observer to detect when the component is visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the component is intersecting (at least 20% visible based on threshold), trigger the animation
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once triggered, we can disconnect the observer to prevent it from firing again
                    observer.disconnect();
                }
            },
            {
                // Trigger when at least 20% of the element is visible
                threshold: 0.2
            }
        );

        // Start observing the component if the ref is attached
        if (bentoRef.current) {
            observer.observe(bentoRef.current);
        }

        // Clean up the observer when the component unmounts
        return () => {
            if (bentoRef.current) {
                // Stop observing if the component is unmounted before the animation triggers
                observer.unobserve(bentoRef.current);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Define base animation classes for fade-in and slight upward movement
    const baseAnimationClasses = 'transition-all duration-700 ease-out';
    const initialAnimationState = 'opacity-0 translate-y-4';
    const finalAnimationState = 'opacity-100 translate-y-0';

    return (
        // Outer container with padding and margin. Attach the ref here to observe the whole section.
        <div className="bg-white p-4 sm:p-8 mt-6" ref={bentoRef}>

            {/* Heading and Subheading with animation */}
            {/* Apply animation classes based on isVisible state */}
            <h1 className={`text-2xl font-bold text-black text-center sm:text-6xl mb-4 ${baseAnimationClasses} ${isVisible ? finalAnimationState : initialAnimationState}`}>
                Navigate Your Knowledge with Ease.
            </h1>
            {/* Corrected className syntax for the paragraph */}
            <p className={`text-sm text-gray-700 text-center sm:text-xl mb-8 ${baseAnimationClasses} ${isVisible ? finalAnimationState : initialAnimationState}`}>
                [Your Product Name] transforms your study resources into an interactive knowledge base, simplifying your learning process and enhancing your academic productivity.
            </p>

            {/* Main Card acting as the Bento Grid container */}
            {/* Apply animation classes to the main grid container */}
            <Card className={`max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-black rounded-lg ${baseAnimationClasses} ${isVisible ? finalAnimationState : initialAnimationState}`}>

                {/* Top Row - Left Card */}
                {/* Added individual card animation with delays and hover effects */}
                <Card className={`bg-lime-300 sm:col-span-2 p-6 sm:p-24 flex items-center justify-center rounded-lg border-lime-300 transition-all duration-500 delay-100 hover:scale-[1.02]`}>
                     <p className="font-bold text-black text-center text-lg sm:text-xl">
                        YOUR MAIN<br/>FEATURE TEXT HERE
                    </p>
                </Card>

                {/* Top Row - Right Card */}
                {/* Added individual card animation with delays and hover effects */}
                <Card className={`bg-lime-300 col-span-1 p-6 sm:p-24 flex items-center justify-center rounded-lg border-lime-300 transition-all duration-500 delay-200 hover:scale-[1.02]`}>
                     {/* Content for this card */}
                </Card>

                {/* Bottom Row - Left Card */}
                {/* Added individual card animation with delays and hover effects */}
                {/* Removed group-hover as there's no parent group class */}
                <Card className={`bg-neutral-900 col-span-1 p-6 sm:p-24 flex items-center justify-center rounded-lg border-neutral-900 transition-all duration-500 delay-300 hover:scale-[1.02]`}>
                    <p className="font-bold text-lime-300 text-center text-lg sm:text-xl transition-colors duration-300 hover:text-white">
                         THROW SOME<br />NEON GREEN<br />TEXT IN HERE
                    </p>
                </Card>

                {/* Bottom Row - Right Card */}
                {/* Added individual card animation with delays and hover effects */}
                {/* Simplified divider line hover effect */}
                <Card className={`bg-neutral-900 sm:col-span-2 p-4 sm:p-6 flex flex-col space-y-4 sm:space-y-6 rounded-lg border-neutral-900 transition-all duration-500 delay-400 hover:scale-[1.01]`}>
                    {/* Content for figures/items */}
                    <div className="text-white font-bold text-lg sm:text-xl transition-colors duration-300 hover:text-lime-300">COOL FIGURE</div>
                    {/* Removed hover:w-full as w-full is already applied */}
                    <div className="h-px bg-lime-300 w-full"></div> {/* Divider line */}
                    <div className="text-white font-bold text-lg sm:text-xl transition-colors duration-300 hover:text-lime-300">ANOTHER FIGURE</div>
                    {/* Add more figures/items as needed */}
                </Card>

            </Card>
        </div>
    );
}
