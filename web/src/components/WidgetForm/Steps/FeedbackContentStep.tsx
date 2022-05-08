import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { LoadingIcon } from "../../LoadingIcon";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackBackRequest: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackBackRequest, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);

    //necessario para fazer checagem do botão de "submit" da textarea
    const [comment, setComment] = useState('');

    //botão p/ loading quando clica pra enviar feedback
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    //Necessario para receber o tipo do feedback feito (bug, idea, other)
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    //necessario para fazer checagem do botão de "submit" da textarea
    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        });

        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackBackRequest}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400
                    text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500
                    focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700
                    scrollbar-tranck-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    //necessario para fazer checagem do botão de "submit" da textarea
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        disabled={comment.length === 0 || isSendingFeedback}
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center
                        items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <LoadingIcon /> : 'Enviar Feedback'}
                    </button>
                </footer>
            </form>
        </>

    )
}