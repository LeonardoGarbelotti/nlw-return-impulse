import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { LoadingIcon } from "../LoadingIcon";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image);
        setIsTakingScreenshot(false);
    }

    if (screenshot) {
        return (
            <button
                type="button"
                // esse botão serve pro lixinho apagar a screenshot
                onClick={() => onScreenshotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                    // aparentemente, isso não é necessario para outros exemplos
                    // somente para este site q possui conteúdo no canto direito
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            >
                <Trash weight="fill" />
            </button>
        )
    }
    return (
        <button
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700
                        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-offset-zinc-900 focus:ring-brand-500"
            onClick={handleTakeScreenshot}
        >
            {isTakingScreenshot ? <LoadingIcon /> : <Camera className="w-6 h-6 text-zinc-100" />}
        </button>
    )
}