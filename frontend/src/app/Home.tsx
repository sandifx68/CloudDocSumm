import { useState } from "react"
import Sidebar from "../components/Sidebar"
import NewSummary from "../features/documents/components/NewSummary"
import Summary from "../features/documents/components/Summary"
import type { SummaryObject } from "../features/documents/types"

function Home() {

    const testSummary = {
        summary: "This document is a certificate issued by the Local Community Public Service for Person Records in Cristian, Brasov County, Romania, at the request of Fazakas Alexandru. It confirms his personal details, including his date of birth, parents' names, and identity card information. More importantly, it details his residential history, showing he has lived at str. 1 Mai nr. 27 in Cristian, Brasov County, from April 15, 2013, to the present. Prior to that, he resided at str. Stefan Cel Mare nr. 2, Sc. A, Ap. 7, in Brasov from his birth on December 15, 2003, until April 14, 2013. The certificate is issued for personal use and its data is protected under GDPR and Romanian legislation",
        title:"This is the title",
        url:"https://storage.googleapis.com/cloud-doc-summ-bucket/translation_bilingual-1758188421723.pdf",
        dateUnix: 1758188424135,
        userId: "V9A5sKOcIER4bSeQRMNXooPD5mX2"
    } as SummaryObject 

    const [currentSummary,setCurrentSummary] = useState<SummaryObject | undefined>()

    return (
        <div className="bg-background text-text w-screen h-screen flex">
            <Sidebar/>
            {currentSummary ? <Summary summary={currentSummary}/> : <NewSummary setSummary={setCurrentSummary}/> }
        </div>
    )
}

export default Home