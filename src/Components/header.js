import React from "react";
import '../Styles/Filter.css';
import Modal from "react-modal";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'solid 1px brown'
    },
};

class Headers extends React.Component {
    
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: '',
            createAccountModalIsOpen:false,
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            phone_number:''
        }
    }
    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }
    handleModalState=(state,value)=>{
        this.setState({[state]:value})
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false })
        toast.success(`${response.profileObj.name} login successfull !`,{position:"top-center"});   
    }
    responseGoogleFail = (response) => {
        this.setState({ isLoggedIn: false})
        toast.error("login Failed !",{position:"top-center"});   
    }
    responseFacebook = (response) => {
        console.log(response)
        toast.success("login successfull !",{position:"top-center"});   
        this.setState({ isLoggedIn: true, loggedInUser: response.name, loginModalIsOpen: false })
    }
    componentClicked= (data)=>{
        console.warn(data);
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
        toast.success("Logout Successfull",{position:"top-center"})
    }
    handelInputChange=(event,state)=>{
        this.setState({[state]:event.target.value})
    }


handleSignUp = () => {
            const { email, password,firstName,lastName } = this.state;
            const signUpObj = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            };
            axios({
                method: 'POST',
                url: 'http://localhost:2021/signup',
                headers: { 'Content-Type': 'application/json' },
                data: signUpObj
            })
                .then(response => {
                    if (response) {
                        this.setState({
                            
                            createAccountModalIsOpen: false,
                            isLoggedIn:true,
                            email: '',
                            password: '',
                            firstName: '',
                            lastName: ''
                        });
                      
                        toast.success(response.data.message,{position:"top-center"});    
                    }    
                })
                
                .catch(err => console.log(err))
}


handleLogin = () => {
    const { email, password } = this.state;
    const loginObj = {
        email: email,
        password: password
    };
    axios({
        method: 'POST',
        url: 'http://localhost:2021/login',
        headers: { 'Content-Type': 'application/json' },
        data: loginObj
    })
        .then(response => {
            
                this.setState({
                    loggedInUser: response.data.firstName,
                    isLoggedIn: true,
                    loginModalIsOpen: false,
                    email: email,
                    password: password,
                });
                toast.success(response.data.Message,{position:"top-center"});
            
                toast.error(response.data.Message,{position:"top-center"})
        
        })
        .catch(err => console.log(err))
        
}



signUpClick=()=>{
    this.setState({loginModalIsOpen:false,createAccountModalIsOpen:true})
}
loginClick=()=>{
    this.setState({loginModalIsOpen:true,createAccountModalIsOpen:false})
}
myFunction=()=>{
    var x = document.getElementById("myInput");
  if (x.type === "password") {
    return(x.type = "text")
  } else {
    return(x.type = "password")
  }
}
    render(){
        const { loginModalIsOpen, isLoggedIn, loggedInUser,createAccountModalIsOpen } = this.state;
        return (
            <>
              
              <div className="container-fluid header">
              <div className="row ">
                  <div className="col-lg-1 col-md-1 col-sm-1 "></div>
                  <div className="col-lg-6 col-md-6 col-sm-4  ">
                      <span className="logo-span">
                          <a href="/" className="logo">e!</a> 
                      </span>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6  text-center ">
                   
                        
                      {isLoggedIn ? <div className="login-span">
                        <div className="login">{loggedInUser}</div>
                        <span className="account" onClick={this.handleLogout}>Logout</span>
                    </div> :
                        <div className="login-span">
                            <div className="login " onClick={()=>this.handleModalState('loginModalIsOpen',true)}>Login</div>
                            <span className="account " onClick={()=>this.handleModalState('createAccountModalIsOpen',true)}>Create an account</span>
                        </div>
                    }


                      
                  </div>
                  <div className="col-lg-1 col-md-1 col-sm-1"></div>
              </div>
          </div>
          <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                    overlayClassName="Overlay"
                ><form>
                    <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('loginModalIsOpen', false)}><img src="../../Assets/x.svg"/></div>
                    <div className="title-text">Login</div>

                    <div><input type="text" className="input-login" placeholder="Enter your email id " onfocus="this.value=''" onChange={(event)=>this.handelInputChange(event,'email')}></input></div>
                    <div><input type="password" id="pass" className="input-login" placeholder="Enter your password " onfocus="this.value=''" onChange={(event)=>this.handelInputChange(event,'password')}></input></div>
                    <div ><button className="btn btn-danger login-btn" onClick={this.handleLogin}id="GFG_Button">Login</button></div>
                    
                    <div className="login-divider"></div>
                    <div className="text-center OR">or</div>

                    <div className="google" ><GoogleLogin
                            clientId="1030732577938-nn52oufujo4mln6llnor5ui2083cod9t.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogleFail}
                            overlayClassName="google"
                            cookiePolicy={'single_host_origin'}
                            className="google"
                        /></div>

                    <div ><FacebookLogin
                            appId="175579314718394"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            cssClass="facebook"
                            textButton="Continue with facebook"
                            icon="fa-facebook-square"
                             />
                    </div>
                    
                    
                    <span style={{marginLeft:"65px"}}>Don’t have account?  </span><a style={{color:"blue"}} onClick={()=>this.signUpClick()} style={{color:"#dc3545"}}>Sign UP</a>
                    </form>
                        
            </Modal>
            <Modal
                    isOpen={createAccountModalIsOpen}
                    style={customStyles}
                    overlayClassName="Overlay"
                >
                     <div>
                         <form>
                        <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('createAccountModalIsOpen', false)}><img src="../../Assets/x.svg"/></div>
                        <h3 className="restaurant-name rest-Name" >Sign up</h3>
                        <span className="form">  <input className="fname" type="text" placeholder="Enter first name" id="fName" onChange={(event)=>this.handelInputChange(event,'firstName')} /></span>
                        <span className="form"> <input className="lname" type="text" placeholder="Enter last name" id="lName" onChange={(event)=>this.handelInputChange(event,'lastName')}/></span>
                        <div className="form"><input className="input-acc" type="text" placeholder="Enter your email" id="email" onChange={(event)=>this.handelInputChange(event,'email')} /></div>
                        <div className="form">   <input className="input-acc" type="password" id="myInput" placeholder="Enter your password"  onChange={(event)=>this.handelInputChange(event,'password')}/></div>
                        <input type="checkbox" onClick={this.myFunction} style={{margin:" 0 8px 0px 15px",width: "15px",height: "14px"}}/>Show Password
                        <div><button className="btn btn-danger create" onClick={this.handleSignUp} >Create Account</button></div>
                        </form>
                        <div className="login-divider"></div>
                    <div className="text-center OR">or</div>

                        <span className="google"style={{}} ><GoogleLogin
                            clientId="1030732577938-nn52oufujo4mln6llnor5ui2083cod9t.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogleFail}
                            overlayClassName="google"
                            cookiePolicy={'single_host_origin'}
                            className="google-signup"
                        /></span>
                         <span ><FacebookLogin
                            appId="175579314718394"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            cssClass="facebook-signup"
                            textButton="facebook"
                            icon="fa-facebook-square"
                             />
                    </span>
                       <br/> <span style={{marginLeft:"95px"}}>Already have an account? </span><span style={{color:"#dc3545"}} onClick={()=>this.loginClick()}>Login</span>

                    </div>
                </Modal>
                <ToastContainer theme="colored"/>
            </>
          )
        }
    
}
export default Headers;

