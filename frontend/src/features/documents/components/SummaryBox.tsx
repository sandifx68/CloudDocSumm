import { useSummary } from "../contexts/useSummary";
import type { SummaryObject } from "../types";

export default function SummaryBox({ summary }: { summary: SummaryObject }) {
    const { currentSummary, setCurrentSummary } = useSummary();
    const isCurrent = currentSummary?.url === summary.url

    return (
        <div
            className={`p-4 text-text cursor-pointer rounded-2xl hover:opacity-80 ${isCurrent ? "bg-button" : ""}`}
            onClick={() => setCurrentSummary(summary)}
        >
            <div className="mb-2 truncate">
                {summary.title}
            </div>
        </div>
    );
}