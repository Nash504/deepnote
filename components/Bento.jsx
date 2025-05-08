import { Card } from "./ui/card";

export default function NeonBento() {
    return (
        <div className="bg-white p-8 mt-6">
            <Card className="max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-1 flex flex-col     gap-4 p-4 bg-black rounded-lg">
                {/* Top Row */}
                <Card className="bg-lime-300 col-span-2 p-24 flex items-center justify-center rounded-lg border-lime-300">
                    <p className="font-bold text-black text-lg">MORE TEXT HERE TOO</p>
                </Card>
                <Card className="bg-lime-300 p-24 col-span-1 flex items-center justify-center rounded-lg border-lime-300"></Card>
                
                {/* Bottom Row */}
                <Card className="bg-neutral-900 col-span-1 p-24 flex items-center justify-center rounded-lg border-neutral-900">
                    <p className="font-bold text-lime-300 text-center">THROW SOME<br />NEON GREEN<br />TEXT IN HERE</p>
                </Card>
                <Card className="bg-neutral-900 col-span-2 p-6 flex flex-col space-y-6 rounded-lg border-neutral-900">
                    <div className="text-white font-bold text-lg">COOL FIGURE</div>
                    <div className="h-px bg-lime-300 w-full"></div>
                    <div className="text-white font-bold text-lg">ANOTHER FIGURE</div>
                </Card>
            </Card>
        </div>
    );
}