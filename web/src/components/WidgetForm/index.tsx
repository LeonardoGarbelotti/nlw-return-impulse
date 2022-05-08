import { useState } from "react";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

//exportando esse objeto para usar nos filhos
export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto',
        },
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada',
        },
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento',
        },
    },
};

// exportanto o tipo Feedback para usar no filho
export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    // estado pra notar qual o tipo de feedback a pessoa escolheu
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

    // Necessario pra avisar quando o Feedback foi feito (vai p/ pagina de sucesso)
    const [feedbackSent, setFeedbackSent] = useState(false);

    // função usada pra resetar o estado do tipo da variavel
    // faz voltar a tela para a anterior (back button)
    function handleBackFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center
        shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackBackRequest={handleBackFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        // a função para saber qual o tipo de Feedback tem que ser passada
                        // como parametro do objeto
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackBackRequest={handleBackFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )
                    }
                </>
            )}

            <footer className="text-zinc-100 text-sm text-opacity-50">
                Seu feedback é importante!
            </footer>
        </div >
    );
}