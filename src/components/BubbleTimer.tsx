// Big bubbly countdown in the "cute and cozy" sticker style: a pastel fill with
// a dark outline, plus a slightly misregistered shadow copy behind it.

function Digits({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className={ch === ':' ? 'bt-colon' : 'bt-digit'}>
          {ch}
        </span>
      ))}
    </>
  );
}

export function BubbleTimer({ text, label }: { text: string; label: string }) {
  return (
    <div className="bubble-timer" role="timer" aria-label={label}>
      <span className="bt-layer bt-shadow" aria-hidden="true">
        <Digits text={text} />
      </span>
      <span className="bt-layer bt-main" aria-hidden="true">
        <Digits text={text} />
      </span>
    </div>
  );
}
