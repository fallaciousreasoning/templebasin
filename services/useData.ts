import { useState, useEffect } from "react"

export default <T>(url: string, defaultValue: T = undefined) => {
    const [data, setData] = useState<T>(defaultValue);

    useEffect(() => {
        setData(defaultValue);
        if (!url)
            return;
            
        fetch(url)
            .then(url => url.json())
            .then(setData);
    }, [url]);

    return data;
}