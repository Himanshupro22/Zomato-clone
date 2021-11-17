import React from 'react'
import '../Styles/Filter.css'
import queryString from 'query-string'
import axios from 'axios';



class Filter extends React.Component{

    constructor(){
        super();
        this.state={
            restaurants : [],
            locations: [],
            location:undefined,
            mealtype:undefined,
            cuisine:[],
            lcost:undefined,
            hcost:undefined,
            sort:undefined,
            page:1,
            pageCount:[]
        }
    }

    componentDidMount(){
        const qs = queryString.parse(this.props.location.search);
        const {mealtype, location} =qs;

        const filterObj={
            mealtype: mealtype,
            location: location
        };

        axios({
            url:'http://localhost:2021/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,mealtype,location,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))

        axios({
            url:'http://localhost:2021/location',
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        })
        .then(response =>{
            this.setState({locations:response.data.locations,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
    }

    locationHandler=(event)=>{
        const location = event.target.value;
        const { mealtype,cuisine,sort,lcost,hcost,page } = this.state;

        const filterObj={
            mealtype:mealtype,
            location: location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            sort,
            lcost,
            hcost,
            page
        };
        axios({
            url:'http://localhost:2021/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,locationpageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}`);
    }


    handelSortChange=(sort)=>{
        const { mealtype,location,cuisine,lcost,hcost,page } = this.state;

        const filterObj={
            mealtype:mealtype,
            location: location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            sort,
            lcost,
            hcost,
            page
        };

        axios({
            url:'http://localhost:2021/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,sort,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
       

    }
    handelCostChange=(lcost,hcost)=>{

        const { mealtype,location,cuisine,sort,page } = this.state;

        const filterObj={
            mealtype:mealtype,
            location: location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            sort,
            lcost,
            hcost,
            page
        };

        axios({
            url:'http://localhost:2021/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,lcost,hcost,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
        
    }
    handelPageChange=(page)=>{

        const { mealtype,location,cuisine, sort,lcost,hcost } = this.state;
        const filterObj={
            mealtype:mealtype,
            location: location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            sort,
            lcost,
            hcost,
            page
        };

        axios({
            url:'http://localhost:2021/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,page,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
    }

    handelCuisineChange=(cuisineId)=>{

        const { mealtype,location,cuisine, sort,lcost,hcost,page } = this.state;

        const index = cuisine.indexOf(cuisineId)
        if(index >= 0){
            cuisine.splice(index,1)
        }
        else{
            cuisine.push(cuisineId);
        }

        const filterObj={
            mealtype:mealtype,
            location: location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            sort,
            lcost,
            hcost,
            page
        };

        axios({
            url:'http://localhost:2021/filter',
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            data:filterObj
        })
        .then(response =>{
            this.setState({restaurants: response.data.restaurants,cuisine,pageCount:response.data.pageCount})
        })
        .catch( err => console.log(err))
     
    }

    handeNavigate=(restId)=>{
        this.props.history.push(`/details?restaurant=${restId}`)
    }

    render(){
        
        const {restaurants,locations,pageCount} = this.state;
        return(
            <div>
            
       
    
    <main>
        <div className="container">
            <div className="title-text my-4 ">Places in Mumbai</div>
            <div className="row  ">
                
                
                <div className="visible-hidden collapse1 " >
                   
                 
                    <span>Filter/Sort</span>

                    


                
                        <span className=" fas fa-chevron-down me-3 mt-2" style={{float:"right"}} data-bs-toggle="collapse" data-bs-target="#filter"></span>
                </div>
                <div className="col-lg-3 col-sm-4 collapse show" id="filter" >
                    <div className="filter-block ">
                        <div className="f1">

                            Filters
                            
                        </div>
    
                        <div className="f2"> 
                            Set Location<br/>
                            <select className=" " onClick={this.locationHandler}>
                                <option  selected disabled>Select a Location</option>
                                {locations.map(item =>{
                                    return <option key={ item.location_id } value={item.location_id}>{`${item.name},${item.city}`}</option>
                                })}
                    </select>
                        </div>
    
                        <div className="f2">
                            Cuisine
                        </div>
                        <div className="f3">
                            <input type="checkbox" className="m-2" onChange={()=>{this.handelCuisineChange(1)}}/>North Indian<br/>
                            <input type="checkbox" className="m-2" onChange={()=>{this.handelCuisineChange(2)}}/>South Indian<br/>
                            <input type="checkbox" className="m-2" onChange={()=>{this.handelCuisineChange(3)}}/>Chines<br/>
                            <input type="checkbox" className="m-2" onChange={()=>{this.handelCuisineChange(4)}}/>Fast food<br/>
                            <input type="checkbox" className="m-2" onChange={()=>{this.handelCuisineChange(5)}}/>Street Food<br/>
                        </div>
    
                        <div className="f2">
                            Cost for two
                        </div>
                        <div className="f3">
                            <input type="radio" name="price" className="m-2" onChange={()=>this.handelCostChange(1,500)}/>Less than ₹500<br/>
                            <input type="radio" name="price" className="m-2" onChange={()=>this.handelCostChange(500,1000)}/>₹500 - ₹1000<br/>
                            <input type="radio" name="price" className="m-2" onChange={()=>this.handelCostChange(1000,1500)}/>₹1000 - ₹1500<br/>
                            <input type="radio"name="price" className="m-2" onChange={()=>this.handelCostChange(1500,2000)}/>₹1500 - ₹2000<br/>
                            <input type="radio"name="price" className="m-2" onChange={()=>this.handelCostChange(2000,50000)}/>₹2000+
                        </div>
    
                        <div className="f2">
                            Sort
                        </div>
                        <div className="f3">
                            <input type="radio" name="r1" className="m-2" onClick={()=> this.handelSortChange(1)}/>Price Low to High<br/>
                            <input type="radio" name="r1" className="m-2" onClick={()=> this.handelSortChange(-1)}/>Price High to Low<br/>
                        </div>

                        <div className="text-center ms-5 visible-hidden ">
                            <button type="button" className="btn btn-outline-danger " style={{width:"80%"}}>Apply</button>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-9 col-sm-12">
                    
                {restaurants.length > 0 ? restaurants.map((item,index) =>{
                    return <div className="item mb-4 "key={index} onClick={()=> this.handeNavigate(item._id)}>
                        <img src="./Assets/efood.png" className="img"/>
                        <div className="rest1-span text-start">
                            <div className="title2">
                                {item.name}
                            </div>
                            <div className="title3 ">
                                {item.locality}<br/>
                            </div>
                            <div className="shop ">
                                {item.city}
                            </div>
                        </div>
                        <div className="h1"></div>
                        <span className="rest2-span">
                            CUISINES:<br/>
                            COST FOR TWO:
                        </span>
                        <span className="rest3-span">
                            {item.cuisine.map((val) => `${val.name}, `)}<br/>
                            &#8377;{item.min_price}
                        </span>
                        </div>
                        
                }):<div className="no_records">Sorry, no records found</div>
                }

                {restaurants.length > 0 ? <div className="col-lg-12 col-md-12 col-sm-12 text-center l my-5 ">
                    <button type="button" className="btn btn-outline-secondary mx-2 ">&lt;</button>
                    {pageCount&& pageCount.map((pageNo)=>{
                        return  <button type="button" onClick={()=>this.handelPageChange(pageNo)} className="btn btn-outline-secondary mx-2">{pageNo}</button>
                    })}
                    <button type="button" className="btn btn-outline-secondary mx-2">&gt;</button>
                </div>:null}
                </div>
                
            </div>
            
                
            
            

        </div>
    </main>
    
        </div>
        )
    }
}
export default Filter;