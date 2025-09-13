import { useState } from "react"
import Sidebar from "../components/Sidebar"
import NewSummary from "../features/documents/components/NewSummary"
import Summary from "../features/documents/components/Summary"

function Home() {

    const [currentSummary,setCurrentSummary] = useState()

    return (
        <div className="bg-background text-text w-screen h-screen flex">
            <Sidebar/>
            {currentSummary ? <Summary/> : <NewSummary setSummary={setCurrentSummary}/> }
        </div>
    )
}

export default Home