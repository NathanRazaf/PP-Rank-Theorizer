import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const HueDropdown = () => {
    const [hue, setHue] = useState(226); // Default hue value
    const [isOpen, setIsOpen] = useState(false);

    // Calculate related hues with modulo 360
    const calculateRelatedHues = (baseHue: number) :
        {
            base: string;
            falseScore: string;
            addScore: string;
            search: string;
            dialog: string;
            confirm: string;
            cancel: string;
        } => {
        const mod360 = (n: number): number => (((n % 360) + 360) % 360);
        return {
            base: baseHue.toString(),
            falseScore: mod360(baseHue - 100).toString(),
            addScore: mod360(baseHue - 100).toString(),
            search: mod360(baseHue + 100).toString(),
            dialog: mod360(baseHue + 100).toString(),
            confirm: mod360(baseHue + 60).toString(),
            cancel: '0'
        };
    };

    // Update CSS variables when hue changes
    useEffect(() => {
        const hues = calculateRelatedHues(hue);
        document.documentElement.style.setProperty('--base-hue', hues.base);
        document.documentElement.style.setProperty('--false-score-hue', hues.falseScore);
        document.documentElement.style.setProperty('--add-score-hue', hues.addScore);
        document.documentElement.style.setProperty('--search-hue', hues.search);
        document.documentElement.style.setProperty('--dialog-hue', hues.dialog);
        document.documentElement.style.setProperty('--confirm-hue', hues.confirm);
        document.documentElement.style.setProperty('--cancel-hue', hues.cancel);
    }, [hue]);

    // Handle hue change from slider
    const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHue(parseInt(e.target.value));
    };

    // Color preview for the dropdown trigger
    const getPreviewStyle = (hueValue: number) => ({
        backgroundColor: `hsl(${hueValue}, 100%, 50%)`,
        width: '24px',
        height: '24px',
        borderRadius: '4px'
    });

    return (
        <div className="w-32 m-8 hue-dropdown cursor-pointer">
            <Select
                open={isOpen}
                onOpenChange={setIsOpen}
                value={hue.toString()}
                // Since we're not using the built-in value selection mechanism
                onValueChange={() => {}}
            >
                <SelectTrigger className="w-full bg-gray-600 rounded-xl border-0 shadow-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue>
                        <div className="flex items-center gap-2">
                            <div style={getPreviewStyle(hue)} />
                            <span>{hue}°</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="border-0 shadow-lg p-0 overflow-hidden rounded-xl">
                    <div className="p-3 bg-gray-600 rounded-xl">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Hue</span>
                            <span className="text-sm">{hue}°</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="359"
                            value={hue}
                            onChange={handleHueChange}
                            className="w-full h-6 appearance-none rounded-lg cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, 
                                    hsl(0, 100%, 50%), hsl(60, 100%, 50%), 
                                    hsl(120, 100%, 50%), hsl(180, 100%, 50%), 
                                    hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(359, 100%, 50%))`
                            }}
                        />
                    </div>
                </SelectContent>
            </Select>
        </div>
    );
};

export default HueDropdown;