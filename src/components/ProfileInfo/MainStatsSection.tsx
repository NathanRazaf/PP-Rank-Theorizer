import {User} from "../../types/userTypes";
import RankHistory from "./RankHistory.tsx";
import { Tooltip } from 'react-tooltip'
import { GradeCountsArray } from "./GradeCounts.tsx";

function MainStatsSection(props: {user : User}) {
    return (
        <div className="flex flex-col">
            <Tooltip id="play-time" opacity={1} className="z-50" style={{ backgroundColor: "#1d1619", padding: "5px 20px 5px 20px"}} />
            <div className="flex flex-row items-center gap-4">
                <div className="ranking-value">
                    <p>Global Ranking</p>
                    <p className="r-number">#{props.user.globalRank.toLocaleString()}</p>
                </div>
                <div className="ranking-value">
                    <p>Country Ranking</p>
                    <p className="r-number">#{props.user.countryRank.toLocaleString()}</p>
                </div>
            </div>
            <RankHistory rankHistory={props.user.rankHistory} />
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 items-center w-60 justify-between">
                    <div className="small-main-stats">
                        <p>Medals</p>
                        <p className="small-main-stats-values font-light">{props.user.numMedals}</p>
                    </div>
                    <div className="small-main-stats">
                        <p>pp</p>
                        <p className="small-main-stats-values font-light">{props.user.pp.toFixed(0)}</p>
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
                <div>
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