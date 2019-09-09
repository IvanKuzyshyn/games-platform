import React from 'react'

import { ActiveUser } from './components/ActiveUser'
import { Navigation } from './components/Navigation'

const TemporaryStyles = {
    background: "hsl(211, 81%, 36%)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    padding: '20px',
};

const TopBar = () => (
    <div style={TemporaryStyles}>
        <Navigation />
        <ActiveUser />
    </div>
);

export { TopBar }
