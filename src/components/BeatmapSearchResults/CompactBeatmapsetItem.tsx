import {CompactBeatmapset} from "@/api/searchApi.ts";

function CompactBeatmapsetItem({ beatmapset }: { beatmapset: CompactBeatmapset }) {
    return (
        <div className="flex items-center gap-4 rounded-xl bg-[hsl(333,10%,20%)] hover:bg-[hsl(333,10%,25%)]">
            <div className="flex flex-row items-center gap-3">
                <img src={beatmapset.cover} alt={beatmapset.title} className="w-12 h-12 rounded-xl"/>
                <div className="flex flex-col items-start">
                    <span><span
                        className="font-semibold">{beatmapset.title}</span> <span className="font-normal text-xs">by {beatmapset.artist}</span></span>
                    <span className="text-xs text-[hsl(333,40%,90%)]">mapped by {beatmapset.creator}</span>
                </div>
            </div>
        </div>
    );
}

export default CompactBeatmapsetItem;