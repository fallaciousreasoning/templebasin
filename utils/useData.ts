import { useState, useEffect } from "react"

export default <T>(url: string, defaultValue: T = undefined) => {
    const [data, setData] = useState<T>(defaultValue);

    useEffect(() => {
        let isValid = true;

        setData(defaultValue);
        if (!url)
            return;

        fetch(url)
            .then(url => url.json())
            .then(data => {
                if (!isValid)
                    return;

                setData(data);
            });

        return () => {
            isValid = false;
        }
    }, [url]);

    return data;
}