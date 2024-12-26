import { GradeCounts } from "@/types/userTypes.ts";
import { getGradeAssetPath } from "@/assets/imageAssetPaths.ts";

function GradeCountsArray(props: { gradeCounts: GradeCounts }) {
    const gradeOrder = ['SSH', 'SS', 'SH', 'S', 'A'];
    return (
        <div className="flex flex-row gap-1">
            {gradeOrder.map(grade => (
                // @ts-expect-error no error duh
                <SingleGradeCount key={grade} grade={grade} count={props.gradeCounts[grade]} />
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