import { useSummary } from "../contexts/useSummary";
import type { SummaryObject } from "../types";

export default function SummaryBox({ title, summary }: { title: string; summary: SummaryObject }) {
    const { setCurrentSummary } = useSummary();

    return (
        <div
            className="p-4 text-text cursor-pointer"
            onClick={() => setCurrentSummary(summary)}
        >
            <h3 className="text-lg mb-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </h3>
        </div>
    );
}