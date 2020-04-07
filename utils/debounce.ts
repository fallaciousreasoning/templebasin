const debounce = <T, A1=never, A2=never, A3=never, A4=never>(func: (...args: [A1,A2,A3,A4]) => T, delay: number) => {
    let timeout;
    let promise: Promise<T>;
    let accept: (value: T) => void;

    return (...args: [A1, A2, A3, A4]) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            const result = func(...args);
            accept(result);

            accept = undefined;
            promise = undefined;
            timeout = undefined;
        }, delay);


        if (!promise)
            promise = new Promise(a => { accept = a; });
        
        return promise;
    };
}

export default debounce;