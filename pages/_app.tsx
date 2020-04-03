import "react-big-calendar/lib/css/react-big-calendar.css"
import { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../utils/theme";

export default ({ Component, pageProps }) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
      }, []);

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps}/>
    </ThemeProvider>;
}