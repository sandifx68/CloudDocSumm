import Sidebar from "../components/Sidebar"

function Home() {
    return (
        <div className="bg-background text-text w-screen h-screen flex">
            <Sidebar/>
            <div className="flex-1 p-4 font-bold text-3xl">Document name.</div>
        </div>
    )
}

export default Home