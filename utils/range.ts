export default (min: number, max: number) => {
    return Array.from(lazyRange(min, max));
}

export function* lazyRange(min: number, max?: number) {
    if (!max) {
        max = min;
        min = 0;
    }

    for (let i = min; i < max; ++i)
        yield i;
}