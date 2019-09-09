import React from 'react';
import { RouteComponentProps } from '@reach/router';

import SignForm from './components/SignForm'

const SignScreen = (props: RouteComponentProps) => (
    <div>
        <SignForm />
    </div>
);

export { SignScreen }
