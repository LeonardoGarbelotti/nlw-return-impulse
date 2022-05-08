import { CloseButton } from "../../CloseButton";
import successImg from "../../../assets/success.svg";

interface FeedbackSuccessStepProps {
    onFeedbackBackRequest: () => void;
}

export function FeedbackSuccessStep({ onFeedbackBackRequest }: FeedbackSuccessStepProps) {
    return (
        <>
            <header>
                <CloseButton />
            </header>

            <div
                className="flex flex-col items-center py-10 w-[304px]"
            >
                <img src={successImg} />
                <span className="text-xl mt-2">Agradecemos o feedback!</span>

                <button
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm
                    leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-offset-zinc-900 focus:ring-brand-500"
                    type="button"
                    onClick={onFeedbackBackRequest}
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    )
}