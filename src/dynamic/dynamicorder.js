import "../App.css";
import Plantilla from "../static/Plantilla";
import React from "react";
import { Orders } from "../authClient/Orders";


class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[], orderId:""};
    
  }
  takeOrdersUser = async () => {
    let url = "https://kfashionapi.onrender.com/orders";
    let res = await fetch(url);

    if (res.ok) {
      let text = await res.json();
        return text;
    }else{
        return 
    }
}
    componentDidMount(){
        console.log(window.location);
        let id = window.location.pathname.split(":")[1];
        if(id!=""){
            
            this.setState({orderId:id})
            
    
        }
        
        this.takeOrdersUser().then(data=>{
            let filter = []
            filter = data.filter((orders) => {
      
                return orders._id === this.state.orderId;
              });
            this.setState({data:filter})
        })
    }
  render() {
    let a = (
      <Orders oneUser={false} dataToDisplay={this.state.data} cancel={true}></Orders>
    );
   
    
    
    
    return (
      <div style={{ minHeight: "85%" }} className="text-white ">
        <div style={{ left: "10%" }}></div>
        {a}
      </div>
    );
  }
}

function DynamicOrder() {
  return <Plantilla sectionToDisplay={<Dynamic />}></Plantilla>;
}

export default DynamicOrder;
