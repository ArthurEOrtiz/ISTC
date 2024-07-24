import React from 'react';

interface CharacterCounterProps {
    value: string;
    limit: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ value, limit }: CharacterCounterProps) => {
    const remainingCharacters = limit - value.length;

    return (
        <div className="text-right text-xs text-gray-500">
            {remainingCharacters} of {limit} characters remaining
        </div>
    );
};

export default CharacterCounter;
