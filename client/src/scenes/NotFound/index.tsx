import React from 'react'
import { Link, RouteComponentProps } from '@reach/router';

const NotFound = (props: RouteComponentProps) => (
    <div>
        <h1>Page not found</h1>
        <Link to="/">Got to Main page</Link>
    </div>
);

export {
    NotFound
}
