import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { SummaryObject } from "../types";

interface SummaryContextValue {
    currentSummary: SummaryObject | undefined;
    setCurrentSummary: (summary: SummaryObject) => void;
}

const SummaryContext = createContext<SummaryContextValue | undefined>(undefined);

export function SummaryProvider({ children }: { children: ReactNode }) {
    const [currentSummary, setCurrentSummary] = useState<SummaryObject | undefined>();

    return (
        <SummaryContext.Provider value={{ currentSummary, setCurrentSummary }}>
            {children}
        </SummaryContext.Provider>
    );
}

export function useSummary() {
    const context = useContext(SummaryContext);
    if (!context) {
        throw new Error("useSummary must be used within a SummaryProvider");
    }
    return context;
}