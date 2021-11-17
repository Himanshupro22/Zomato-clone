import React from "react";
import '../Styles/Home.css';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-6 col-lg-3">
                  <h2>Company</h2>
                  <ul>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}>About Us</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}href="#">Blogs</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}href="#">Report Fraud</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}><NavLink to="/contact">Contact</NavLink></a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2>For Restaurants</h2>
                  <ul>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}><NavLink to="/addRestaurant">Add a Restaurant</NavLink></a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}href="#">Business App</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}href="#">Business Blog</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}}href="#">Products for Businesses</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2>For you</h2>
                  <ul>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}} href="#">Privicy</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}} href="#">Terms</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}} href="#">Security</a>
                    </li>
                    <li id="footer li">
                      <a style={{marginLeft: "-12px"}} href="#">Sitemap</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-3">
                  <h2>Follow Us</h2>
                  <div className="row">
                    <div className="col-3 mx-auto">
                      <a href="https://www.facebook.com/zomato" target="_blank">
                      <i class="fab fa-facebook-f fontawesome-style"></i>
                      </a>
                      
                    </div>
                    <div className="col-3 mx-auto">
                      <a href="https://www.instagram.com/zomato/" target="_blank">
                        <i class="fab fa-instagram fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                    <a href="https://www.youtube.com/c/zomato" target="_blank">
                      <i class="fab fa-youtube fontawesome-style"></i>
                    </a>
                    </div>
                    <div className="col-3 mx-auto">
                    <a href="https://twitter.com/zomato" target="_blank">
                      <i class="fab fa-twitter fontawesome-style"></i>    
                    </a>
                      
                    </div>
                    <ul>
                      <li><a  target="_blank" href="https://play.google.com/store/apps/details?id=com.application.zomato&_branch_match_id=967310958836512805">
                      <img src="../../Assets/android.png" style={{width:"160px"}}></img></a></li>
                      
                      <li><a target="_blank" href="https://apps.apple.com/in/app/zomato-food-restaurant-finder/id434613896?_branch_match_id=967310958836512805">
                        <img src="../../Assets/ios.png" style={{width:"160px"}}></img></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-5">
                <p className="main-hero-para text-center w-100" style={{fontSize:" x-small",marginTop: "-25px",color:"#9a9a9a"}}>
               By continuing pst this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
               Copyright @ 2021 Aditya_jadhav. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;