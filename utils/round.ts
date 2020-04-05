export default (num: number, dps: number=0) => {
    const mul = 10 ** dps;
    return Math.round(num*mul) / mul;
}