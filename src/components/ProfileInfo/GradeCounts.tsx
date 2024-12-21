import { GradeCounts } from "../../types/userTypes";
import { getGradeAssetPath } from "../../assets/imageAssetPaths.ts";

function GradeCountsArray(props: { gradeCounts: GradeCounts }) {
    return (
        <div className="flex flex-row gap-1">
            {Object.entries(props.gradeCounts).map(([grade, count]) => (
                <SingleGradeCount key={grade} grade={grade} count={count} />
            ))}
        </div>
    );
}

function SingleGradeCount(props: { grade: string, count: number }) {
    return (
        <div className="flex flex-col items-center">
            <img className="size-11 block" src={getGradeAssetPath(props.grade)} alt={props.grade} />
            <div className="text-sm font-semibold -mt-3">{props.count}</div>
        </div>
    );
}


export { GradeCountsArray, SingleGradeCount }