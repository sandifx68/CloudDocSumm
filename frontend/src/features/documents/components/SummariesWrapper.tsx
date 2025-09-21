import Summaries from "./Summaries"

export default function SummariesWrapper() {

    return (
        <div className="mt-4 flex flex-col">
            <div className="text-muted mb-2">Summaries:</div>
            <Summaries/>
        </div>
    )
}