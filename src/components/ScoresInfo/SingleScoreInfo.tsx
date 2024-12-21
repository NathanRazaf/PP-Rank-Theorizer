import {Score} from "../../types/scoreTypes";
import {getGradeAssetPath, getModAssetPath, getModName} from "../../assets/imageAssetPaths.ts";
import {
    differenceInDays,
    differenceInHours,
    differenceInMonths,
    differenceInMinutes,
    differenceInSeconds,
    differenceInYears
} from "date-fns";

function SingleScoreInfo({ score }: { score: Score }) {
    return (
        <div className="flex flex-row mx-12 rounded-2xl bg-score-main-bg">
            <div className="flex flex-row items-center">
                <div className="px-4">
                    <img
                        src={getGradeAssetPath(score.grade)}
                        alt={score.grade}
                        className="w-10 h-10"
                    />
                </div>
                <div className="flex flex-col py-1">
                    <a href={score.beatmapUrl} className="hover:underline decoration-white">
                        <span className="text-white max-w-full text-sm">{score.title} </span>
                        <span className="text-white text-xs">by {score.artist}</span>
                    </a>
                    <div className="flex flex-row gap-4 items-center">
                        <span style={{color: "#ea0"}} className="text-xs">{score.version}</span>
                        <span style={{color: "hsl(333,10%,60%)"}} className="text-xs">{getTimeAgo(score.date)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


function ModsArray({ mods }: { mods: string[] }) {
    return (
        <div className="flex gap-1">
            {mods.map((mod, index) => (
                <div
                    key={index}
                    className="relative group"
                >
                    <img
                        src={getModAssetPath(mod)}
                        alt={mod}
                        className="w-8 h-8 hover:scale-110 transition-transform"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
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


const getLocalDateTime = (dateString: string) => {
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
        <div>
            <div>{day} {month} {year}</div>
            <div>{hours}:{minutes}:{seconds} UTC{offsetSign}{offsetHours}</div>
        </div>
    )
};

export default SingleScoreInfo;