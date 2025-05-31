import { User } from "@/types/userTypes.ts";
import ProfileHeader from "./ProfileHeader.tsx";
import AllStatsSection from "./AllStatsSection.tsx";
import { GameMode } from "./GameModeTab.tsx";

interface ProfileInfoProps {
    user: User;
    activeMode?: GameMode;
    onModeChange?: (mode: GameMode) => void;
}

function ProfileInfo({ user, activeMode = "osu", onModeChange }: ProfileInfoProps) {
    return (
        <div>
            <ProfileHeader
                user={user}
                activeMode={activeMode}
                onModeChange={onModeChange}
                preferredMode={user.preferredMode}
            />
            <AllStatsSection user={user} />
        </div>
    );
}

export default ProfileInfo