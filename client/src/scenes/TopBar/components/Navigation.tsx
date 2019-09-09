import React from 'react'
import { Link } from "@reach/router";

const Navigation = () => (
 <nav>
     <Link to="/">Games List</Link>
     <Link to="/leaderboard">Leaderboard</Link>
 </nav>
);

export { Navigation }
