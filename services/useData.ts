import { useState, useEffect } from "react"

export default <T>(url: string) => {
    const [data, setData] = useState<T>(undefined);

    useEffect(() => {
        fetch(url).then(url => url.json()).then(setData);
    }, [url]);
    
    return data;
}