import { GradeCounts } from "../types.ts";
import { getGradeAssetPath } from "../assets/imageAssetPaths.ts";

function GradeCountsArray(props: { gradeCounts: GradeCounts }) {
    return (
        <div className="flex-row justify-items-center">
            {Object.entries(props.gradeCounts).map(([grade, count]) => (
                <SingleGradeCount key={grade} grade={grade} count={count} />
            ))}
        </div>
    );
}

function SingleGradeCount(props: { grade: string, count: number }) {
    return (
        <div className="flex-col justify-items-center align-middle">
            <img src={getGradeAssetPath(props.grade)} alt={props.grade} />
            <div className="font-bold">{props.count}</div>
        </div>
    );
}


export { GradeCountsArray, SingleGradeCount }