import { useState } from "react"
import Sidebar from "../components/Sidebar"
import NewSummary from "../features/documents/components/NewSummary"
import Summary from "../features/documents/components/Summary"
import type { SummaryObject } from "../features/documents/types"

function Home() {

    const [currentSummary,setCurrentSummary] = useState<SummaryObject>()

    return (
        <div className="bg-background text-text w-screen h-screen flex">
            <Sidebar/>
            {currentSummary ? <Summary/> : <NewSummary setSummary={setCurrentSummary}/> }
        </div>
    )
}

export default Home