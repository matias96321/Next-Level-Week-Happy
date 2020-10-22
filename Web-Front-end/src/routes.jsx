import React from 'react';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanagesCreate from './pages/CreateOrphanage'
import Orphanages from './pages/Orphanage'


function Routes() {
    return (

        <Router>
            <Switch>
                    
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                    
                <Route path="/orphanages/create" component={OrphanagesCreate} />
                <Route path="/orphanages/:id" component={Orphanages} />

            </Switch>
        </Router>

    )
}

export default Routes;