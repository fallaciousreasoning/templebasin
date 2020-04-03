export default (props: { children?: React.ReactNode }) => {
    return <form autoComplete="on">
        {props.children}
    </form>;
}