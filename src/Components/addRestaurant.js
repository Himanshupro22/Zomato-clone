import React from "react";
import { NavLink } from "react-router-dom";
import '../Styles/Home.css'


class addRestaurant extends React.Component  {
    render(){
        return(
            <>
            <div className="wallpaper">
                <div className="row container-fluid">
                    <div className=" col-12 col-lg-12">
                    <NavLink to="/"> <div >  Back to Homepage  </div>
                        <span className="rest-t1">  Register your restaurant on Zomato</span>
                        </NavLink>
                        
                        <br/>
                        <span className="rest-t1">for free and get more customers!</span> 
                        <div className="rest-t1"> Redirect to fiter page. </div>
                        <NavLink to="/filter">
                            <div> Click here </div>
                        </NavLink>
                    </div>
                </div>
            </div>

            </>
        )
    }
}

export default addRestaurant;