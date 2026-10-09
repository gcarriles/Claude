import { useEffect, useState } from 'react';
import type { Character } from '../characters';

/** Cut-out character art. Without `size` it fills its parent. */
export function Portrait({ character, size }: { character: Character; size?: number }) {
  const [missing, setMissing] = useState(false);
  useEffect(() => setMissing(false), [character.id]);

  return (
    <span className="portrait" style={size ? { width: size, height: size } : undefined}>
      {missing ? (
        <span className="portrait-initials" style={{ color: character.colors.ink }}>
          {character.initials}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}art/${character.id}.png`}
          alt={character.name}
          draggable={false}
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}
