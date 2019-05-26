import React, { useContext, FunctionComponent } from "react";

import { AppContext } from "../../context/application";
import { SignScreen } from "../Sign";

interface Props {
    onUserAuthorize: (user: any) => void,
}

const Bootstrap: FunctionComponent<Props> = (props: Props) => {
    const { onUserAuthorize } = props;
    const { user } = useContext(AppContext);

    if (user) {
        return (
            <div><h1>WE HAVE USER!!!</h1></div>
        )
    }

    return <SignScreen onUserAuthorize={onUserAuthorize} />
};

export { Bootstrap }
