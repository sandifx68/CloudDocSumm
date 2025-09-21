import {useMemo} from "react";

type DownloadLinkProps = {
    url: string,
    title: string
}

export default function DownloadLink({ url, title } : DownloadLinkProps) {
  const inferredName = useMemo(() => {
    try {
      const u = new URL(url);
      const path = u.pathname;
      const last = path.substring(path.lastIndexOf('/') + 1) || "download";
      return decodeURIComponent(last);
    } catch {
      // Fallback for relative or malformed URLs
      const last = url.substring(url.lastIndexOf('/') + 1) || "download";
      try { return decodeURIComponent(last); } catch { return last; }
    }
  }, [url]);
  const handleDownload = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = inferredName || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  return (
    <div className="font-bold text-3xl">
        {"Summary of "} 
        <span className="text-blue-400 hover:underline hover:cursor-pointer" onClick={handleDownload}>
            {title}
        </span>
    </div>
  );
};
