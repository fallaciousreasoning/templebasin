import { CircularProgress, CircularProgressProps } from "@material-ui/core"

export default (props: CircularProgressProps) => {
    return <div>
        <CircularProgress {...props}/>
    </div>;
}