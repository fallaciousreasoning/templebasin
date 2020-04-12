export const capitalize = (word: string) => {
    if (!word || word.length === 0) return word;
    return word[0].toUpperCase() + word.substr(1);
}

export const capitalizeSentence = (sentence: string, separator = ' ') =>
    sentence.split(separator).map(capitalize).join(separator);