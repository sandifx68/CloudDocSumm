import { useState, type ReactNode } from "react";
import type { SummaryObject } from "../types";
import { SummaryContext } from "./SummaryContext";

export function SummaryProvider({ children }: { children: ReactNode }) {
    const [currentSummary, setCurrentSummary] = useState<SummaryObject | undefined>();

    return (
        <SummaryContext.Provider value={{ currentSummary, setCurrentSummary }}>
            {children}
        </SummaryContext.Provider>
    );
}