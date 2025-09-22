import { createContext } from "react";
import type { SummaryObject } from "../types";

interface SummaryContextValue {
    currentSummary: SummaryObject | undefined;
    setCurrentSummary: (summary: SummaryObject | undefined) => void;
}

export const SummaryContext = createContext<SummaryContextValue | undefined>(undefined);