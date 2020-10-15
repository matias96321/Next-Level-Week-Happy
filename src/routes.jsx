import React from 'react';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'

function Routes() {
    return (

        <Router>
        
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />

        </Router>

    )
}

export default Routes;