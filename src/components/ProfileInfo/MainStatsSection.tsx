import {User} from "@/types/userTypes.ts";
import RankHistory from "./RankHistory.tsx";
import { Tooltip } from 'react-tooltip'
import { GradeCountsArray } from "./GradeCounts.tsx";

function MainStatsSection(props: {user : User}) {
    return (
        <div className="flex flex-col">
            <Tooltip id="play-time" opacity={1} className="z-50" style={{ backgroundColor: "var(--dropdown-bg)", padding: "5px 20px 5px 20px"}} />

            {/* Ranking section - responsive layout */}
            <div className="flex flex-row items-center gap-4 w-full">
                <div className="ranking-value w-1/2 md:w-auto">
                    <p>Global Ranking</p>
                    <p className="r-number">#{props.user.globalRank?.toLocaleString() ?? '-'}</p>
                </div>
                <div className="ranking-value w-1/2 md:w-auto">
                    <p>Country Ranking</p>
                    <p className="r-number">#{props.user.countryRank?.toLocaleString() ?? '-'}</p>
                </div>
            </div>

            {/* Rank history - full width */}
            <RankHistory rankHistory={props.user.rankHistory} />

            {/* Stats and grades - responsive layout */}
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                {/* Medals, PP, Play Time */}
                <div className="flex flex-row w-full justify-between md:w-60 md:justify-between">
                    <div className="small-main-stats">
                        <p>Medals</p>
                        <p className="small-main-stats-values font-light">{props.user.numMedals.toLocaleString()}</p>
                    </div>
                    <div className="small-main-stats">
                        <p>pp</p>
                        <p className="small-main-stats-values font-light">{parseInt(props.user.pp.toFixed(0)).toLocaleString()}</p>
                    </div>
                    <div className="small-main-stats">
                        <p>Total Play Time</p>
                        <p className="small-main-stats-values font-light"
                           data-tooltip-id="play-time"
                           data-tooltip-content={convertSecondsToHours(props.user.playTime) + " hours"}
                           data-tooltip-place="bottom"
                        >{convertSecondsToTime(props.user.playTime)}</p>
                    </div>
                </div>

                {/* Grade Counts - centered on mobile */}
                <div className="flex justify-center md:justify-start">
                    <GradeCountsArray gradeCounts={props.user.gradeCounts} />
                </div>
            </div>
        </div>
    );
}

// Convert total seconds into days, hours, minutes
function convertSecondsToTime(totalSeconds: number) {
    const totalMinutes = totalSeconds / 60;
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${days}d ${hours}h ${minutes}m`;
}

// Convert total seconds into just hours
function convertSecondsToHours(totalSeconds: number) {
    return (totalSeconds / 3600).toFixed(0);
}

export default MainStatsSection