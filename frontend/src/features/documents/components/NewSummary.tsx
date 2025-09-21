import { useEffect, useState } from "react";
import FileHandler from "./FileHandler";
import { useCreateSummary } from "../hooks";
import { useSummary } from "../contexts/useSummary";

export default function NewSummary() {
    const { setCurrentSummary } = useSummary();
    const [file, setFile] = useState<File | null>(null);
    const { mutate, data, isSuccess, isPending } = useCreateSummary();
    const [error, setError] = useState<string>("");


    // When the mutation is succesful, we set the new summay.
    useEffect(() => {
        if (isSuccess) {
            setCurrentSummary(data);
        }
    }, [isSuccess, data, setCurrentSummary]);
    
    const handleUpload = () => {
        if(!file)
            return
        mutate({file: file}, {onError: (err : Error) => setError(err.message)}) 
    }

    return (
        <div className="flex-1">
            <div className="h-1/10 p-4 font-bold text-5xl">Summarize New Document</div>
            <div className="h-8/10 flex flex-col justify-center items-center">
                
                <FileHandler file={file} setFile={setFile} setError={setError}/>

                <div className="mt-4">
                { error ? (<div className="text-red-500">{error}</div>) :
                    file ? 
                        (<>File chosen: <span className="font-bold">{file.name}</span></>) :
                        ("No file chosen.")
                }
                </div>
                
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!file}
                    aria-disabled={!file}
                    className="mt-4 rounded-md px-4 py-2 bg-sidebar text-text hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? "Uploading..." : "Get summary"}
                </button>
                
            </div>
        </div>
    )
}
