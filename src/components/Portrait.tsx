import { useEffect, useState } from 'react';
import type { Character } from '../characters';

export function Portrait({ character, size }: { character: Character; size: number }) {
  const [missing, setMissing] = useState(false);
  useEffect(() => setMissing(false), [character.id]);

  return (
    <div className="portrait" style={{ width: size, height: size }}>
      {missing ? (
        <span
          className="portrait-initials"
          style={{ color: character.colors.ink, fontSize: size * 0.36 }}
        >
          {character.initials}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}art/${character.id}.png`}
          alt={character.name}
          width={size}
          height={size}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}
