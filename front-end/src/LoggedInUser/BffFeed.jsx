import React, { Component } from "react";
import axios from "axios";

class BffFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      arrayOfbffs: "",
      BffsInfo:[]
    };
  }

  componentWillMount() {
    this.renderBFFsArray();
  }
//   componentDidMount(){
//     this.renderBFFsInfo()
//   }

  renderBFFsArray = () => {
    const { user, bffs, arrayOfbffs } = this.state;
    console.log("getting the user for bffs", user);
    if (user) {
      axios.get("/users/allBffs").then(res => {
        this.setState({
          arrayOfbffs: res.data.map(obj=>obj.bff)
        });
        console.log('set the state_', this.state.arrayOfbffs)
        // console.log("gettings the user BFFS", arrayOfbffs);
      });
    //   if (arrayOfbffs){
          console.log('second axios call')
        axios.get("/users/getPics")
        .then(response=>{
            console.log(response.data)
            const filteredBffs=response.data
        })
     //response.fata.filter(user=>user.username === arrayOfbffs.map)
    // }

  };
}



//   renderBFFsInfo=()=>{
//       console.log('hiiiiiiiii')
//       const {arrayOfbffs}= this.state
//       if (arrayOfbffs){
//           axios.get("/users/getPics")
//           .then(response=>{
//               console.log(response.data)
//               const filteredBffs=response.data
//           })

//       }
//   }

  //router.get("/userAttributes/:username", loginRequired, db.getUserAttributes);



  //arrayOfbffs:
  //having an array of objects with a key of bffs




  render() {
    return <div>hiiiii</div>;
  }
}

export default BffFeed;
