import { useSummary } from "../features/documents/contexts/SummaryContext";
import Sidebar from "../components/Sidebar"
import NewSummary from "../features/documents/components/NewSummary"
import Summary from "../features/documents/components/Summary"

function Home() {

    const {currentSummary} = useSummary()

    return (
        <div className="bg-background text-text w-screen h-screen flex">
            <Sidebar/>
            {currentSummary ? <Summary/> : <NewSummary/> }
        </div>
    )
}

export default Home