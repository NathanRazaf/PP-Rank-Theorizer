import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Score } from '@/types/scoreTypes';
import { Tooltip } from 'react-tooltip';
import { getGradeAssetPath, getModAssetPath, getModName } from "@/assets/imageAssetPaths.ts";

interface ScorePreviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    score: Score;
    onConfirm: () => Promise<void>;
    isLoading?: boolean;
}

const ModsArray = ({ mods }: { mods: string[] }) => {
    return (
        <div className="flex gap-0 ssi-true h-full items-center">
            {mods.map((mod, index) => (
                <div
                    key={index}
                    className="relative"
                    data-tooltip-id={`preview-mod-tooltip-${mod}`}
                    data-tooltip-content={getModName(mod)}
                >
                    <img
                        src={getModAssetPath(mod)}
                        alt={mod}
                        className="w-8 h-22"
                    />
                    <Tooltip
                        id={`preview-mod-tooltip-${mod}`}
                        opacity={1}
                        className="z-50"
                        style={{
                            backgroundColor: "var(--dropdown-bg)",
                            padding: "5px 20px 5px 20px",
                            fontSize: "12px"
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

const ScorePreviewDialog = ({
                                isOpen,
                                onClose,
                                score,
                                onConfirm,
                                isLoading = false
                            }: ScorePreviewDialogProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-3xl confirm-dialog border-none">
                <DialogHeader>
                    <DialogTitle className="text-white">Score Preview</DialogTitle>
                </DialogHeader>

                <div className="flex flex-row ml-6 bg-transparent items-center h-11">
                    <div className="flex flex-row items-center
                    min-w-0 w-0 flex-1 ssi-true rounded-bl-xl rounded-tl-xl h-full">
                        <div className="pr-3 pl-5 flex-shrink-0">
                            <img
                                src={getGradeAssetPath(score.grade)}
                                alt={score.grade}
                                className="w-10 h-10 m-0"
                            />
                        </div>
                        <div className="flex flex-col py-0.5 min-w-0">
                            <div className="text-start truncate">
                                <span className="text-white max-w-full text-sm">{score.title} </span>
                                <span className="text-white text-xs">by {score.artist}</span>
                            </div>
                            <div className="flex flex-row gap-4 items-center">
                                <span style={{color: "#ea0"}} className="text-xs">{score.version}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center flex-shrink-0 h-full">
                        <div className="h-full">
                            <ModsArray mods={score.mods} />
                        </div>
                        <div
                            className="flex items-center text-left
                            pl-4 pr-4 -mr-4 ssi-true h-full w-24"
                            style={{clipPath: "polygon(85% -1px, 100% 50%, 85% 101%, 0% 101%, 0 -1px)"}}
                        >
                            <span style={{color: "#fc2"}} className="text-left font-semibold text-sm">
                                {score.accuracy.toFixed(2)}%
                            </span>

                        </div>

                        <div
                            className="min-w-28 inline-flex items-center
                            ssi-true-accent justify-center h-full rounded-br-xl rounded-tr-xl"
                        >
                            <span className="text-base font-semibold pl-3" style={{color: "hsl(var(--base-hue),100%,70%)"}}>
                                {parseInt(score.pp.toFixed(0)).toLocaleString()}
                                <span className="text-xs font-semibold" style={{color: "hsl(var(--base-hue),40%,70%)"}}>pp</span>
                            </span>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between">
                    <Button
                        variant="destructive"
                        onClick={onClose}
                        disabled={isLoading}
                        className="cancel-button border-none text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="border-none confirm-button text-white"
                    >
                        {isLoading ? 'Confirming...' : 'Confirm Score'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ScorePreviewDialog;