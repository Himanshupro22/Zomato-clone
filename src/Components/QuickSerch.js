import React from 'react'
import '../Styles/Home.css'
import QuickSerchItem from'./QuickSerchItem'

class QuickSerch extends React.Component{
    render(){
        const {mealtypeData}=this.props;
        return(
            <div>
                <div>
                <div className="container">
            <div className="Htitle2 mt-5 ms-4">Quick Searches</div>
            <div className="Htitle3 mt-3 ms-4">Discover restaurants by type of meal</div>

            <div className="row  my-3 ">

                {mealtypeData.map(item =>{

                    return   <QuickSerchItem item={item}/>

                })}
                
                
                </div>
            </div>
        </div>
            </div>
        )
    }
}
export default QuickSerch;