'use client';
import {Card} from "@/components/ui/card";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap, BarChart3, ArrowRight,Brain, Sparkles,Timer,Star,Scale } from "lucide-react";

// Custom hook for counting animation (already well-abstracted)
const useCountAnimation = (end, duration = 2000, delay = 0, isVisible) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        let animationFrame;

        const startAnimation = () => {
            startTime = Date.now();
            animateCount();
        };

        const animateCount = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed > duration) {
                setCount(end);
                return;
            }

            const progress = elapsed / duration;
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);

            animationFrame = requestAnimationFrame(animateCount);
        };

        const timeoutId = setTimeout(startAnimation, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(animationFrame);
        };
    }, [end, duration, delay, isVisible]);

    return count;
};

// Helper component for staggered text animations
const AnimatedText = ({ isVisible, delay, className, children }) => (
    <div
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        {children}
    </div>
);

// Wrapper component for Bento Grid Cards with common animations and hover effects
const BentoCard = ({
    children,
    index,
    cardKey,
    hoveredCard,
    setHoveredCard,
    isVisible,
    variants,
    className = '',
    hoverClass = '', // Class for specific hover effects on the card wrapper
}) => {
    return (
        <motion.div
            className={`relative rounded-xl overflow-hidden group ${className} ${hoveredCard === cardKey ? hoverClass : ''}`}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            onMouseEnter={() => setHoveredCard(cardKey)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            {children}
        </motion.div>
    );
};


export default function NeonBento() {
    const bentoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 100);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (bentoRef.current) {
            observer.observe(bentoRef.current);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (bentoRef.current) {
                observer.unobserve(bentoRef.current);
            }
        };
    }, []);

    const userCount = useCountAnimation(98, 2000, 500, isVisible);
    const accuracy = useCountAnimation(99, 2500, 800, isVisible);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1 + 0.4, // Added base delay to start after heading
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }
        })
    };

    const metricsData = [
        { label: "Study Time Saved", value: "68%", icon: <Timer className="text-lime-400" size={24} /> },
        { label: "Knowledge Retention", value: "2.4x", icon: <Brain className="text-lime-400" size={24} /> },
        { label: "User Satisfaction", value: "4.9/5", icon: <Star className="text-lime-400" size={24} /> },
        { label: "Concept Mastery", value: "+87%", icon: <Scale className="text-lime-400" size={24} /> },
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-8 overflow-hidden" ref={bentoRef}>
            {/* Background grid pattern */}
            <div className="absolute inset-0 "></div>

            {/* Animated glow effect in the background */}
            <div className="relative">
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-300 opacity-20 blur-[100px] rounded-full transition-all duration-1000 ease-in-out ${isVisible ? 'w-96 h-96' : 'w-0 h-0'}`}
                    style={{
                        transform: `translate(-50%, -50%) translate(${Math.sin(scrollY * 0.002) * 100}px, ${Math.cos(scrollY * 0.002) * 50}px)`
                    }}
                ></div>
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Heading section with advanced animations */}
                <div className="relative z-10 mb-16 text-center">
                   
                    <AnimatedText isVisible={isVisible} delay={200} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 text-center">
                        <h1>
                            Navigate Your <span className="relative">
                                Knowledge
                               
                            </span> with Ease.
                        </h1>
                    </AnimatedText>

                    <AnimatedText isVisible={isVisible} delay={300} className="text-md sm:text-xl font-poppins text-gray-700 max-w-3xl mx-auto mb-8 font-poppins text-center">
                        <p>
                            DeepNote transforms your study resources into an interactive knowledge base,
                            
                            simplifying your learning process and enhancing your academic productivity.
                        </p>
                    </AnimatedText>
                </div>

                {/* Main bento grid with motion animations */}
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    {/* Feature Spotlight Card */}
                    <BentoCard
                        index={0}
                        cardKey="feature"
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        isVisible={isVisible}
                        variants={cardVariants}
                        className="col-span-1 sm:col-span-2"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br from-lime-400 via-lime-300 to-green-300 transition-all duration-500 ${hoveredCard === 'feature' ? 'opacity-100' : 'opacity-90'}`}></div>
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

                        <div className="relative p-8 sm:p-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="bg-black rounded-full p-2">
                                        <Zap size={18} className="text-lime-300" />
                                    </div>
                                    <h3 className="font-semibold text-black text-lg">AI-POWERED INSIGHTS</h3>
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Understand complex topics in minutes</h2>
                                <p className="text-black/80 text-lg max-w-md">Our advanced AI extracts key concepts and creates visual knowledge maps from your study materials.</p>
                            </div>

                            <div className={`flex items-center mt-8 space-x-2 group/cta transition-all ${hoveredCard === 'feature' ? 'translate-x-2' : 'translate-x-0'}`}>
                            
                               
                            </div>
                        </div>

                        <div className={`absolute inset-0 bg-lime-300 opacity-0 blur-xl transition-opacity duration-700 ${hoveredCard === 'feature' ? 'opacity-20' : ''}`}></div>
                    </BentoCard>

                    {/* Stats Card */}
                    <BentoCard
                        index={1}
                        cardKey="stats"
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        isVisible={isVisible}
                        variants={cardVariants}
                        hoverClass="border-lime-300/50 scale-[0.2]" // Specific hover effect class for the wrapper
                        className="bg-black border-2  border-lime-300/0 transition-all duration-500 scale-[0.999]" // Base styles
                    >
                         {/* Content */}
                        <div className="relative p-8 flex flex-col justify-between h-full">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-lime-300/20 rounded-full p-2">
                                    <BarChart3 size={18} className="text-lime-300" />
                                </div>
                                <h3 className="font-semibold text-lime-300 text-lg">STATISTICS</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-5xl font-bold text-white mb-2">{userCount}<span className="text-lime-300 pl-2">%</span></div>
                                    <p className="text-gray-400">of users report improved study efficiency</p>
                                </div>

                                <div>
                                    <div className="text-5xl font-bold text-white mb-2">{accuracy}<span className="text-lime-300 pl-2">%</span></div>
                                    <p className="text-gray-400">accuracy in answer retrieval</p>
                                </div>
                            </div>
                        </div>

                        {/* Animated gradient on hover */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-lime-500/10 to-transparent opacity-0 transition-opacity duration-500 ${hoveredCard === 'stats' ? 'opacity-100' : ''}`}
                        ></div>
                    </BentoCard>

                    {/* Interactive Demo Card */}
                    <BentoCard
                        index={2}
                        cardKey="demo"
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        isVisible={isVisible}
                        variants={cardVariants}
                         className="bg-neutral-900"
                    >
                         {/* Content */}
                        <div className="relative p-8 h-full flex flex-col items-center justify-center text-center">
                            <div className={`h-16 w-16 rounded-full bg-lime-300/20 flex items-center justify-center mb-6 transition-all duration-500 ${hoveredCard === 'demo' ? 'bg-lime-300/30 scale-110' : ''}`}>
                                <Sparkles size={24} className="text-lime-300" />
                            </div>

                            <h3 className="text-2xl font-bold text-lime-300 mb-4">TRY INTERACTIVE DEMO</h3>
                            <p className="text-gray-400 mb-6">Experience how DeepNote transforms your learning process</p>

                          
                             

                             
                        </div>

                        {/* Radial gradient on hover */}
                        <div
                            className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${hoveredCard === 'demo' ? 'opacity-100' : ''}`}
                             style={{
                                background: 'radial-gradient(circle at center, rgba(163, 230, 53, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
                            }}
                        ></div>
                    </BentoCard>

                    {/* Metrics Card */}
                     <BentoCard
                        index={3}
                        cardKey="metrics"
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        isVisible={isVisible}
                        variants={cardVariants}
                        className="col-span-1 sm:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-800"
                    >
                         {/* Content */}
                        <div className="relative p-8 h-full">
                            

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {metricsData.map((metric, i) => (
                                    <div key={i} className={`transition-all duration-500 ${hoveredCard === 'metrics' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`} style={{ transitionDelay: `${i * 50}ms` }}>
                                        <div className="text-2xl mb-2">{metric.icon}</div>
                                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                                        <div className="text-sm text-gray-400">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                             {/* Animated divider */}
                            <div className="relative h-px w-full bg-neutral-700 my-8 overflow-hidden">
                                <div
                                     className={`absolute top-0 left-0 h-full bg-lime-300 transition-all duration-1000 ease-in-out ${hoveredCard === 'metrics' ? 'w-full' : 'w-0'}`}
                                ></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-gray-400">Based on data from 10,000+ students</p>
                               
                            </div>
                        </div>

                         {/* Corner accent */}
                        <div className={`absolute -top-10 -right-10 w-20 h-20 bg-lime-300/30 rounded-full blur-xl transition-all duration-500 ${hoveredCard === 'metrics' ? 'opacity-100 scale-150' : 'opacity-50 scale-100'}`}></div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
}