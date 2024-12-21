import { Score } from "../../types/scoreTypes";
import SingleScoreInfo from "./SingleScoreInfo.tsx";

function ScoresInfo({ scores }: { scores: Score[] }) {
    return (
        <div className="space-y-4 m-2.5 rounded-lg flex flex-col p-4" style={{backgroundColor: "hsl(333,10%,20%)"}}>
            <h2
                className="text-base font-bold mb-4 self-start ml-6"
                style={{borderBottom: "2px solid hsl(333,100%,70%)"}}
            >Ranks</h2>
            <h3 className={`r_title relative flex items-center before:absolute before:w-[3px] before:h-[0.65em] before:mt-0 before:left-[-0px] before:rounded-full before:content-['']
                text-sm px-3 ml-3 font-semibold`}>
                Best Performance
                <span
                    style={{backgroundColor : "hsl(333,10%,10%)", color: "hsl(333,10%,60%)"}}
                    className="text-xs ml-3 rounded-2xl px-2"
                >{scores.length}
                </span>
            </h3>
            <div className="flex flex-col gap-0.5">
                {scores.map((score, index) => (
                    <SingleScoreInfo key={index} score={score} index={index}/>
                ))}
            </div>
        </div>
    );
}


export default ScoresInfo;