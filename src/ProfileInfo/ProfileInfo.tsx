import {User} from "../types.ts";
import { ProfileHeader } from "./ProfileHeader.tsx";
import { AllStatsSection } from "./AllStatsSection.tsx";

function ProfileInfo(props: { user: User }) {
    return (
        <div>
        <ProfileHeader user={props.user} />
        <AllStatsSection user={props.user} />
        </div>
    );
}

export { ProfileInfo }