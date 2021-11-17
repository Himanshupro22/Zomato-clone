import React from "react";
import {withRouter} from 'react-router-dom'

class QuickSerchItem extends React.Component{

    NavigateToFilter=(meal_typeID)=>{

        const locationId =sessionStorage.getItem('locationId');
        if(locationId)
        {        
            this.props.history.push(`/filter?mealtype=${meal_typeID}&location=${locationId}`);
        }  
    else{
        this.props.history.push(`/filter?mealtype=${meal_typeID}`);
    } 
 }
    render(){
        const {item}=this.props;
        return (
            <div  onClick={()=>this.NavigateToFilter(item.meal_type) } key={ item.meal_type } className="Hcard mx-auto px-0 mx-0 my-2 col-md-6">
                    <div><img src={`./${item.image}`} className="Hcard-img "/></div>
                    <div className="px-3 py-3">
                        <div className="Hcard-title">{item.name}</div>
                        <div className="Hcard-description">{item.content}</div>
                    </div>
                </div>
        )
    }
}

export default withRouter(QuickSerchItem);