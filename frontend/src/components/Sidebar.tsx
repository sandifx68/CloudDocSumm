import Authenticator from "../features/auth/components/Authenticator";

function Sidebar () {
    return (
        <div className="p-4 bg-sidebar text-text w-1/5 h-screen border border-sidebar rounded-r-xl"> 
            <div className="p-2 text-2xl text-text font-bold">Cloud Doc Summ</div>
            <Authenticator/>
            <div>History below</div>
        </div>
    )
}

export default Sidebar;