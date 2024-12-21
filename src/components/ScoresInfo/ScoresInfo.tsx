import { Score } from "../../types/scoreTypes";
import SingleScoreInfo from "./SingleScoreInfo.tsx";

function ScoresInfo({ scores }: { scores: Score[] }) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Scores Info</h2>
            <div className="flex flex-col gap-0.5">
                {scores.map((score, index) => (
                    <SingleScoreInfo key={index} score={score} />
                ))}
            </div>
        </div>
    );
}


export default ScoresInfo;