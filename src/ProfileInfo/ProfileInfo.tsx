import { getFlagUrl } from "../assets/imageAssetPaths.ts";
import {User} from "../types.ts";
import {RankHistory} from "./RankHistory.tsx";
import { GradeCountsArray } from "./GradeCounts.tsx";

function ProfileInfo(props: { user: User }) {
    return (
        <div>
        <h2>Profile Info</h2>
        <img src={props.user.avatarUrl} alt="Avatar" />
        <img src={props.user.coverUrl} alt="Cover" />
        <img src={getFlagUrl(props.user.countryCode)} alt="Flag" />
        <p>PP: {props.user.pp}</p>
        <p>Global Rank: {props.user.globalRank}</p>
        <RankHistory rankHistory={props.user.rankHistory} />
        <GradeCountsArray gradeCounts={props.user.gradeCounts} />
        <p>Country Rank: {props.user.countryRank}</p>
        <p>Accuracy: {props.user.statistics.accuracy}</p>
        <p>Level: {props.user.level}</p>
        <p>Level Progress: {props.user.levelProgress}</p>
        <p>Username: {props.user.username}</p>
        </div>
    );
}



export { ProfileInfo }