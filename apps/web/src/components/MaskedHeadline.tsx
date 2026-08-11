import {
  WORD_REVEAL_INITIAL_DELAY_MS,
  WORD_REVEAL_STAGGER_MS,
} from "../constants/animation";

type MaskedHeadlineProps = {
  text: string;
};

export function MaskedHeadline({ text }: MaskedHeadlineProps) {
  return (
    <h1 className="masked-headline" aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span aria-hidden="true" key={`${word}-${index}`}>
          <span className="word-mask">
            <span
              style={{
                animationDelay: `${
                  WORD_REVEAL_INITIAL_DELAY_MS +
                  index * WORD_REVEAL_STAGGER_MS
                }ms`,
              }}
            >
              {word}
            </span>
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}
