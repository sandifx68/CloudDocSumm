import { useAuth } from "../../../contexts/useAuth"
import { useSummaries } from "../hooks"
import SummaryBox from "./SummaryBox"
import { RingLoader } from "react-spinners"

export default function Summaries() {
    const { userLoggedIn } = useAuth()
    
    if(!userLoggedIn)
        return (
            <div className="p-2 text-center">You must be logged in to see summaries!</div>
        )

    const summariesQuery = useSummaries()

    if(summariesQuery.isLoading) {
        const color = getComputedStyle(document.documentElement).getPropertyValue("--color-text");
        return (
            <div className="flex justify-center items-center p-2">
                <RingLoader color={color}/>
            </div>
        )
    }
    
    if(summariesQuery.error)
        return (
            <div className="p-2 text-center text-red-400">{summariesQuery.error.message}</div>
        )
    
    if(!summariesQuery.data) 
        return (
            <div className="mt-2"> You have no past summaries to display. </div>            
        )
    
    return (
        <>
            {summariesQuery.data?.map((summary) => (
                <SummaryBox
                    key={summary.dateUnix}
                    title={summary.title}
                    summary={summary}
                />
            ))}
        </>
    )
}