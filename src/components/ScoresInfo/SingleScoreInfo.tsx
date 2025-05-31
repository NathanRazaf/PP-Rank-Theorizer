import {Score} from "@/types/scoreTypes.ts";
import { Tooltip } from 'react-tooltip';
import {getGradeAssetPath, getModAssetPath, getModName} from "@/assets/imageAssetPaths.ts";
import {
    differenceInDays,
    differenceInHours,
    differenceInMonths,
    differenceInMinutes,
    differenceInSeconds,
    differenceInYears
} from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MoreVertical} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import React from "react";

function SingleScoreInfo({ score, index, onDeleteFakeScore }:
                         { score: Score, index : number, onDeleteFakeScore: (scoreId: number) => Promise<void> }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const handleDelete = async () => {
        await onDeleteFakeScore(score.id);
        setIsDeleteDialogOpen(false);
        setIsDropdownOpen(false);  // Close dropdown
    };

    return (

        <div className="flex flex-row ml-6 bg-transparent items-center h-11 group">
            <Tooltip id={`score-date-time-${index}`} opacity={1} className="z-50" style={{ backgroundColor: "var(--dropdown-bg)", padding: "5px 20px 5px 20px"}} />
            <Tooltip id={`score-decimal-pp-${index}`} opacity={1} className="z-50" style={{ backgroundColor: "var(--dropdown-bg)", padding: "5px 20px 5px 20px", fontSize: "12px"}} />
            <div className={`flex flex-row items-center min-w-0 w-0 flex-1 ${score.isTrueScore ? 'ssi-true' : 'ssi-false'} rounded-bl-xl rounded-tl-xl h-full`}>
                <div className="pr-3 pl-5 flex-shrink-0">
                    <img
                        src={getGradeAssetPath(score.grade)}
                        alt={score.grade}
                        className="w-10 h-10 m-0"
                    />
                </div>
                <div className="flex flex-col py-0.5 min-w-0">
                    <a href={score.beatmapUrl} className="hover:underline decoration-white text-white text-start truncate">
                        <span className="text-white max-w-full text-sm">{score.title} </span>
                        <span className="text-white text-xs">by {score.artist}</span>
                    </a>
                    <div className="flex flex-row gap-4 items-center">
                        <span style={{color: "#ea0"}} className="text-xs">{score.version}</span>
                        <span
                            style={{color: "hsl(var(--base-hue),10%,60%)"}} className="text-xs"
                            data-tooltip-id={`score-date-time-${index}`}
                            data-tooltip-html = {getLocalDateTime(score.date)}
                            data-tooltip-place="top"
                        >
                            {getTimeAgo(score.date)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center flex-shrink-0 h-full group">
                <div className={`h-full`}>
                    <ModsArray mods={score.mods} arrayIndex={index} isTrueScore={score.isTrueScore}/>
                </div>
                <div
                    className={`flex flex-col items-start justify-center pl-4 pr-4 -mr-4 ${score.isTrueScore ? 'ssi-true' : 'ssi-false'} h-full w-40`}
                    style={{clipPath: "polygon(92% 0, 100% 50%, 92% 100%, 0% 100%, 0 0%)"}}
                >
                    <div className="flex flex-row items-center w-full">
                        <span style={{color: "#fc2"}}
                              className="w-24 text-left font-semibold text-sm">{score.accuracy.toFixed(2)}%</span>
                        <span
                            className="w-24 text-left font-semibold text-sm">{parseInt(score.actualPP.toFixed(0)).toLocaleString()}pp</span>
                    </div>
                    <span className="text-xs text-left pr-6">weighted {score.weight.toFixed(0)}%</span>
                </div>
                <div
                    className={`min-w-28 inline-flex items-center ${score.isTrueScore ? 'ssi-true-accent' : 'ssi-false-accent'} justify-center h-full rounded-br-xl rounded-tr-xl`}
                    data-tooltip-id={`score-decimal-pp-${index}`}
                    data-tooltip-content={score.pp.toLocaleString()}
                    data-tooltip-place="top"
                >
                    <span className="text-base font-semibold pl-3" style={{color: "hsl(var(--base-hue),100%,70%)"}}>
                        {parseInt(score.pp.toFixed(0)).toLocaleString()}
                        <span className="text-xs font-semibold" style={{color: "hsl(var(--base-hue),40%,70%)"}}>pp</span>
                    </span>
                </div>
            </div>
            {/* Actions menu with delete confirmation */}
            <div className="flex items-center pl-2 h-full">
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger className="focus:outline-none hover:outline-none p-0 -mr-1 bg-transparent">
                        <MoreVertical className="h-5 w-5"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 border-none" style={{
                        color: "white",
                        backgroundColor: "var(--dropdown-bg)",
                        padding: "5px 10px 5px 10px",
                        borderRadius: "5px",
                    }}>
                        {score.isTrueScore ? (
                            <DropdownMenuItem
                                className="cursor-pointer text-start relative flex items-center pl-6 hover:!bg-osu-bg-2
                    hover:!text-white before:absolute before:w-[3px] before:h-[0.8em]
                    ssi-dd-menu before:rounded-full before:left-2
                    before:content-[''] before:opacity-0 hover:before:opacity-100"
                                onClick={() => window.open(`https://osu.ppy.sh/scores/${score.id}`)}
                            >
                                View Details
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                className="cursor-pointer text-start relative flex items-center pl-6 hover:!bg-osu-bg-2
                    hover:!text-white before:absolute before:w-[3px] before:h-[0.8em]
                    ssi-dd-menu before:rounded-full before:left-2
                    before:content-[''] before:opacity-0 hover:before:opacity-100"
                                onClick={() => {
                                    setIsDropdownOpen(false);  // Close dropdown
                                    setIsDeleteDialogOpen(true);  // Open dialog
                                }}
                            >
                                Delete Play
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent className="border-none" style={{backgroundColor: "var(--dropdown-bg)"}}>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Delete Score</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete this score? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 border-none text-white">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-500 border-none text-white"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}


function ModsArray({mods, arrayIndex, isTrueScore}: { mods: string[], arrayIndex: number, isTrueScore: boolean }) {
    return (
        <div
            className={`flex gap-0 ${isTrueScore ? 'ssi-true' : 'ssi-false'} h-full items-center`}>
            {mods.map((mod, index) => (
                <div
                    key={index}
                    className="relative"
                    data-tooltip-id={`mod-tooltip-${getModAssetPath(mod)}-${arrayIndex}`}
                    data-tooltip-content={getModName(mod)}
                >
                    <img
                        src={getModAssetPath(mod)}
                        alt={mod}
                        className="w-8 h-22"
                    />
                    <Tooltip
                        id={`mod-tooltip-${getModAssetPath(mod)}-${arrayIndex}`}
                        opacity={1}
                        className="z-50"
                        style={{
                            backgroundColor: "var(--dropdown-bg)",
                            padding: "5px 20px 5px 20px",
                            fontSize: "12px"
                        }}
                    />
                </div>
            ))}
        </div>
    );
}


const getTimeAgo = (dateString: string) => {
    // Parse dates and force UTC
    const date = new Date(dateString);
    const now = new Date();

    // Convert both to UTC strings and then back to dates to force UTC
    const dateUTC = new Date(date.toISOString());
    const nowUTC = new Date(now.toISOString());

    const years = differenceInYears(nowUTC, dateUTC);
    const months = differenceInMonths(nowUTC, dateUTC);
    const days = differenceInDays(nowUTC, dateUTC);
    const hours = differenceInHours(nowUTC, dateUTC);
    const minutes = differenceInMinutes(nowUTC, dateUTC);
    const seconds = differenceInSeconds(nowUTC, dateUTC);

    if (years >= 2) {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
    if (months > 0 && days > 60) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (seconds > 10) {
        return `${seconds} seconds ago`;
    }
    return 'just now';
};


function getLocalDateTime(dateString: string) {
    const date = new Date(dateString);

    // Get month name
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get day with leading zero if needed
    const day = date.getDate().toString();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Get time components with leading zeros
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Get timezone offset
    const offset = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offset / 60)).toString();
    const offsetSign = offset <= 0 ? '+' : '-';

    return (
        `<div class="text-xs">
            <span class="font-semibold">${day} ${month} ${year} 
            <span class="font-normal" style="color: hsl(var(--base-hue),40%,70%)">${hours}:${minutes}:${seconds} UTC ${offsetSign}${offsetHours}</span>
        </div>`
    )
}

export default SingleScoreInfo;