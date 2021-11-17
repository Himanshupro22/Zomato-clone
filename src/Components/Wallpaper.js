import React from 'react'
import '../Styles/Home.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Wallpaper extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants :[],
            searchText:undefined,
            suggestions:[]
        }
    }
    onClickHandler=(event)=>{
        const locID = event.target.value;
        sessionStorage.setItem('locationId',locID)

        axios({
            url:`http://localhost:2021/restaurants/${locID}`,
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        })
        .then(response =>{
            this.setState({restaurants:response.data.Restaurents})
        })
        .catch( err => console.log(err))
    }
    handleInputChange = (event) => {
        const { restaurants } = this.state;
        const searchText = event.target.value;

        let searchRestaurants = [];
        if (searchText) {
            searchRestaurants = restaurants.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        this.setState({ suggestions: searchRestaurants, searchText });

    }

    selectedText = (resItem) => {
        this.props.history.push(`/details?restaurant=${resItem._id}`)
    }

    renderSuggestions =() =>{
        const{suggestions} = this.state;

        if (suggestions.length === 0){
            return null;
        }
        return(
            <ul  className="list-lab" style={{backgroundColor: 'white',marginTop: '4px',listStyleType:'none'}}>
                {
                    suggestions.map((item,index)=>(
                        
                    <li style={{ color: '#192f60'}} key={index}onClick={()=>this.selectedText(item)}>
                         {/* <img style={{borderRadius:'50px',padding:'3px',marginRight:'11px'}} src={`./${item.image}`} alt="Sorry for the Inconvinience" height="40px" width="40px" /> */}
                        {`${item.name} - ${item.locality} , ${item.city}`}
                        <div className="login-divider"></div>
                        </li>))
                    
                }
            </ul>
        )
    }
    
    render(){
        const {suggestions} = this.state;
        const {locationData} = this.props;
        return(
            <div>
                 <div>
                <div className="container-fluid Himg ">
        
            
            <div className="row text-center pt-4 ">
                <div className="col-12">
                    <p className="Hlogo px-4 py-2 ">e! </p>
                </div>
            </div>
            <div className="row  pt-4  ">
                <div className="col-12 text-center">
                    <p className="Htitle">Find the best restaurants, cafés, and bars</p>
                </div>
            </div>
            <div className="row pt-4  search-bar-row my-4">
                <div className=" col-12 col-lg-2 col-md-1 col-sm-12 "></div>
                <div className="text-end end col-lg-3 col-md-4 col-sm-12 col-12  ">
                    <select className="Hdropdown px-2 py-3 " onClick={this.onClickHandler}>
                        <option selected disabled>Please Select a Location</option>
                        {locationData.map(item =>{
                            return <option key={ item.location_id } value={item.location_id}>{`${item.name},${item.city}`}</option>
                        })}
                    </select>
                </div>
                <div className="text-center mid col-lg-4 col-md-6 col-sm-12 col-12  ">
                    <i className="Hico fas fa-search   " ></i>
                    <div id="notebooks">
                    <input type="text" id="query " placeholder="Search for restaurants" className="Hlocation px-5 py-3" onChange={this.handleInputChange} />
                    <div className="ul">
                    <div className="li" >
                        {this.renderSuggestions()}
                    </div>
                    </div>
                    </div>
                </div>
               
                <div className="col-12 col-lg-3 col-md-1 "></div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-1 col-lg-"></div>
            </div>
        </div>
            </div>
            </div>
        )
    }
}
export default withRouter(Wallpaper);