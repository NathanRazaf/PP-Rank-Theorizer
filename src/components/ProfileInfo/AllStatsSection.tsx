import {User} from "../../types/userTypes";
import MainStatsSection from "./MainStatsSection.tsx";
import StatsDetailedSection from "./StatsDetailedSection.tsx";

function AllStatsSection(props: {user: User}) {
    return (
        <div className="px-12 py-3 flex flex-row items-center flex-1 gap-4">
            <div className="flex-[7]">
                <MainStatsSection user={props.user}/>
            </div>
            <div className="min-h-full w-[2px] bg-osu-bg-1 self-stretch"/>
            <div className="flex-[3]">
                <StatsDetailedSection statistics={props.user.statistics}/>
            </div>
        </div>
    )
}

export default AllStatsSection