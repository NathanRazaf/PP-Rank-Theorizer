import {Score} from "../../types/scoreTypes";
import { Tooltip } from 'react-tooltip';
import {getGradeAssetPath, getModAssetPath, getModName} from "../../assets/imageAssetPaths.ts";
import {
    differenceInDays,
    differenceInHours,
    differenceInMonths,
    differenceInMinutes,
    differenceInSeconds,
    differenceInYears
} from "date-fns";

function SingleScoreInfo({ score, index }: { score: Score, index : number }) {
    return (

        <div className="flex flex-row ml-6 bg-transparent">
            <Tooltip id={`score-date-time-${index}`} opacity={1} className="z-50" style={{ backgroundColor: "#1d1619", padding: "5px 20px 5px 20px"}} />
            <Tooltip id={`score-decimal-pp-${index}`} opacity={1} className="z-50" style={{ backgroundColor: "#1d1619", padding: "5px 20px 5px 20px", fontSize: "12px"}} />
            <div className="flex flex-row items-center min-w-0 w-0 flex-1 bg-score-main-bg rounded-bl-xl rounded-tl-xl">
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
                            style={{color: "hsl(333,10%,60%)"}} className="text-xs"
                            data-tooltip-id={`score-date-time-${index}`}
                            data-tooltip-html = {getLocalDateTime(score.date)}
                            data-tooltip-place="top"
                        >
                            {getTimeAgo(score.date)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center flex-shrink-0">
                <ModsArray mods={score.mods} />
                <div
                    className="flex flex-col items-start justify-center pl-4 pr-4 -mr-4 bg-score-main-bg h-full w-40"
                    style={{clipPath: "polygon(92% 0, 100% 50%, 92% 100%, 0% 100%, 0 0%)"}}
                >
                    <div className="flex flex-row items-center -mb-1 w-full">
                        <span style={{color: "#fc2"}}
                              className="w-24 text-left font-semibold text-sm">{score.accuracy.toFixed(2)}%</span>
                        <span
                            className="w-24 text-left font-semibold text-sm">{parseInt(score.actualPP.toFixed(0)).toLocaleString()}pp</span>
                    </div>
                    <span className="text-xs text-left pr-6">weighted {score.weight.toFixed(0)}%</span>
                </div>
                <div
                    style={{background: "hsl(333,10%,25%)"}}
                    className="min-w-28 inline-flex items-center justify-center h-full rounded-br-xl rounded-tr-xl"
                    data-tooltip-id={`score-decimal-pp-${index}`}
                    data-tooltip-content={score.pp.toLocaleString()}
                    data-tooltip-place="top"
                >
                    <span className="text-base font-semibold pl-3" style={{color: "hsl(333,100%,70%)"}}>
                        {parseInt(score.pp.toFixed(0)).toLocaleString()}
                        <span className="text-xs font-semibold" style={{color: "hsl(333,40%,70%)"}}>pp</span>
                    </span>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}


function ModsArray({ mods }: { mods: string[] }) {
    return (
        <div className="flex gap-0 bg-score-main-bg h-full items-center">
            {mods.map((mod, index) => (
                <div
                    key={index}
                    className="relative group"
                >
                    <img
                        src={getModAssetPath(mod)}
                        alt={mod}
                        className="w-8 h-22 hover:scale-110 transition-transform"
                    />
                    <div className="z-50 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 tooltip text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {getModName(mod)}
                    </div>
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
    const days = differenceInDays(nowUTC, dateUTC) + 1;
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


function getLocalDateTime (dateString: string) {
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
            <span class="font-normal" style="color: hsl(333,40%,70%)">${hours}:${minutes}:${seconds} UTC ${offsetSign}${offsetHours}</span>
        </div>`
    )
}

export default SingleScoreInfo;