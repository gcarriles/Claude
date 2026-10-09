// Big pixel countdown with a misregistered "print" effect:
// three stacked copies in ink-light / ink-deep / ink, nudged a few pixels apart.

function Digits({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className={ch === ':' ? 'pt-colon' : 'pt-digit'}>
          {ch}
        </span>
      ))}
    </>
  );
}

export function PixelTimer({ text, label }: { text: string; label: string }) {
  return (
    <div className="pixel-timer" role="timer" aria-label={label}>
      <span className="pt-layer pt-light" aria-hidden="true">
        <Digits text={text} />
      </span>
      <span className="pt-layer pt-deep" aria-hidden="true">
        <Digits text={text} />
      </span>
      <span className="pt-layer pt-main" aria-hidden="true">
        <Digits text={text} />
      </span>
    </div>
  );
}
