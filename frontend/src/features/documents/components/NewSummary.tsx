import { useState } from "react";
import FileHandler from "./FileHandler";

export default function NewSummary({setSummary} : {setSummary: React.Dispatch<React.SetStateAction<undefined>>}) {
    const [file, setFile] = useState<File | null>(null);
    

    const handleUpload = () => {
        console.log("Summary set!")
        setSummary(undefined);
    }

    return (
        <div className="flex-1">
            <div className="h-1/10 p-4 font-bold text-5xl">Summarize New Document</div>
            <div className="h-8/10 flex flex-col justify-center items-center">
                
                <FileHandler file={file} setFile={setFile}/>
                
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!file}
                    aria-disabled={!file}
                    className="mt-4 rounded-md px-4 py-2 bg-sidebar text-text hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Get summary
                </button>
                
            </div>
        </div>
    )
}
