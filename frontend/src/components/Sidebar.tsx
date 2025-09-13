import Authenticator from "../features/auth/components/UserStatus";

function Sidebar () {
    return (
        <div className="p-6 bg-sidebar text-text w-1/5 h-screen border border-sidebar rounded-r-xl"> 
            <div className="mb-4 text-4xl text-text font-bold text-center">Cloud Doc Summ</div>
            <Authenticator/>
            <div className="p-2 text-center">History below</div>
        </div>
    )
}

export default Sidebar;