import React from 'react';

import SignForm from './components/SignForm'

interface Props {
    onUserAuthorize: (user: any) => void,
}

const SignScreen = (props: Props): React.FunctionComponentElement<any> => {
    console.log('PROPS', props);

    return (
        <div>
            <SignForm onUserAuthorize={props.onUserAuthorize} />
        </div>
    )
};

export { SignScreen }
