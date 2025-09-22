import { useEffect, useState } from "react";
import DownloadLink from "../../../components/DownloadLink";
import { useSummary } from "../contexts/useSummary";

export default function Summary() {
    const { currentSummary } = useSummary();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currentSummary) {
            setIsVisible(false); // Reset visibility
            const timeout = setTimeout(() => {
                setIsVisible(true); 
            }, 100); 
            return () => clearTimeout(timeout);
        }
    }, [currentSummary]);

    if (!currentSummary) {
        return <div>No summary selected.</div>;
    }

    const date = new Date(currentSummary.dateUnix);
    const dateDisplayed = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return (
        <div className="flex-1">
            <div className="h-1/10 p-4">
                <div className="flex justify-between items-top">
                    <DownloadLink title={currentSummary.title} url={currentSummary.url} />
                    <div className="text-2xl text-muted inline-block align-middle">
                        {dateDisplayed}
                    </div>
                </div>
            </div>

            <div className="h-8/10 flex items-center justify-center p-8">
                <div
                    className={`max-w-3xl w-full text-center text-2xl bg-sidebar border-4 border-muted rounded-md p-6 transition-opacity ${
                        isVisible ? "opacity-100 duration-500" : "opacity-0 duration-0"
                    }`}
                >
                    {currentSummary.summary}
                </div>
            </div>
        </div>
    );
}
