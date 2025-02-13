"use client"

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
    const  environment  = useDraftModeEnvironment();
    const router = useRouter();

    //only show this disable draft mode button when outside of presentation tool
    if(environment !== "live" && environment != "unknown" ){
        return null;
    }
const hendleClick = async () => {
    await fetch("/draft-mode/disable", );
    router.refresh();
}
    return (
        <button 
        onClick={hendleClick}
        className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2 rounded-lg z-50">
            Disable draft mode
        </button>
    );
}
