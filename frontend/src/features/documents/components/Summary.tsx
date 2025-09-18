import DownloadLink from "../../../components/DownloadLink";
import type { SummaryObject } from "../types";

export default function Summary({summary} : {summary : SummaryObject}) {

    const date = new Date(summary.dateUnix)
    const dateDisplayed = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 

    return (
        <div className="flex-1">
            <div className="h-1/10 p-4">
                <div className="flex justify-between items-top">
                    
                    <DownloadLink title={summary.title} url = {summary.url} />

                    <div className="text-2xl text-muted inline-block align-middle">
                        {dateDisplayed}
                    </div>
                </div>
            </div>

            <div className="h-8/10 flex items-center justify-center p-8">
                <div className="max-w-3xl w-full text-center text-2xl bg-sidebar border-4 border-muted rounded-md p-6">
                    {summary.summary}
                </div>
            </div>
        </div>
    )
}
