import {CompactBeatmap, CompactBeatmapset} from "@/api/searchApi.ts";
import React, {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import { getDiffColour } from "@/assets/imageAssetPaths.ts";

function BeatmapIconSvg({color}: {color: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 inline-block">
            <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill={color} />
        </svg>
    );
}

function CompactBeatmapItem({ beatmap, onSelect }: { beatmap: CompactBeatmap; onSelect: (beatmapId: number) => void }) {
    return (
        <div
            className="flex items-center gap-4 rounded-xl bg-[hsl(333,10%,25%)] hover:bg-[hsl(333,10%,30%)] p-2 ml-16 cursor-pointer"
            onClick={() => onSelect(beatmap.beatmapId)}
        >
            <div className="flex flex-col items-start">
                <span className="flex items-center gap-2">
                    <BeatmapIconSvg color={getDiffColour(beatmap.stars)}/>
                    <span className="text-sm">{beatmap.version}</span>
                    <span className="text-xs text-[hsl(333,40%,90%)]">{beatmap.stars.toFixed(2)}★</span>
                </span>
            </div>
        </div>
    );
}

function CompactBeatmapsetItem({
                                   beatmapset,
                                   onSelectBeatmap
                               }: {
    beatmapset: CompactBeatmapset;
    onSelectBeatmap?: (beatmapId: number) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent click from bubbling up to parent button
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col gap-1">
            <div
                className="flex items-center gap-4 rounded-xl bg-[hsl(333,10%,20%)] hover:bg-[hsl(333,10%,25%)] cursor-pointer"
                onClick={handleClick}
            >
                <div className="flex flex-row items-center gap-3 flex-grow">
                    <img src={beatmapset.cover} alt={beatmapset.title} className="w-12 h-12 rounded-xl"/>
                    <div className="flex flex-col items-start">
                        <span>
                            <span className="font-semibold">{beatmapset.title}</span>
                            <span className="font-normal text-xs"> by {beatmapset.artist}</span>
                        </span>
                        <span className="text-xs text-[hsl(333,40%,90%)]">mapped by {beatmapset.creator}</span>
                    </div>
                </div>
                <div className="pr-2">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {isExpanded && (
                <div className="flex flex-col gap-1">
                    {beatmapset.beatmaps.map((beatmap) => (
                        <CompactBeatmapItem
                            key={beatmap.beatmapId}
                            beatmap={beatmap}
                            onSelect={onSelectBeatmap || (() => {})}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CompactBeatmapsetItem;