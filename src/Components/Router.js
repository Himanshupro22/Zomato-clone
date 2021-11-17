import {BrowserRouter, Route,Switch} from 'react-router-dom'

import Home from './Home'
import Filter from './filter'
import Details from './details'
import Error from './error'
import Footer from './footer'
import Headers from './header'
import Contact from './contact'
import addRestaurant from './addRestaurant'

function Router(){
    return(
        <BrowserRouter>
        <Headers/>
        <Switch>
            
            <Route exact path='/' component={Home}></Route>
            <Route path='/filter' component={Filter}></Route>
            <Route path='/details' component={Details}></Route>
            <Route path='/contact' component={Contact}></Route>
            <Route path='/addRestaurant' component={addRestaurant}></Route>
            <Route component={Error}></Route>
            
        </Switch>
        <Footer/>
        </BrowserRouter>
    )
}
export default Router;