import {User} from "@/types/userTypes.ts";
import MainStatsSection from "./MainStatsSection.tsx";
import StatsDetailedSection from "./StatsDetailedSection.tsx";

function AllStatsSection(props: {user: User}) {
    return (
        <div className="px-4 md:px-12 py-3 flex flex-col md:flex-row items-center flex-1 gap-4">
            <div className="w-full md:flex-[7]">
                <MainStatsSection user={props.user}/>
            </div>

            {/* Divider that changes from horizontal to vertical based on screen size */}
            <div className="w-full h-[2px] md:h-auto md:w-[2px] my-4 md:my-0 bg-osu-bg-1 md:self-stretch"></div>

            <div className="w-full md:flex-[3]">
                <StatsDetailedSection statistics={props.user.statistics}/>
            </div>
        </div>
    )
}

export default AllStatsSection