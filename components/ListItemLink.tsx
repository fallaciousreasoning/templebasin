import { useRouter } from "next/dist/client/router"
import React, { useCallback } from "react";
import { Button, Link, ListItemProps, ListItem } from "@material-ui/core";

interface Props extends ListItemProps {
    href: string;
}

export default (props: Props) => {
    const { href, ...otherProps } = props;

    return <ListItem
        {...otherProps as any}
        component='a'
        button
        href={props.href}>
        {otherProps.children}
    </ListItem>
}