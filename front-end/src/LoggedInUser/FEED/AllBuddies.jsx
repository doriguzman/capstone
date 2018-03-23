import React, { Component } from "react";
import axios from "axios";
import UserProfileCards from './UserProfileCards'

class AllBuddies extends Component {
  constructor(props) {
    super(props);
    this.state = {
			user: this.props.user,
			username:this.props.username,
			allUsers: [],
			errorMsg: "",
			photoURLs: []


    };
  }


getUserPics =()=>{
		axios
			.get("/users/getPics")
			.then(response => {
				const filteredUsers = response.data.filter(user => user.username !==this.state.username);
				console.log('filteredUsers', filteredUsers)
				this.setState({
					allUsers: filteredUsers
				})
			})
			.catch(err => {
				console.log(err)
				this.setState({
					errorMsg: "Sorry, there's something wrong with your feed."
				})
			});
	}

	componentWillMount(){
		this.getUserPics();
	}


  render() {
		const {allUsers}=this.state
		console.log("all users: ", this.state.allUsers)
		console.log("photo urls: ", this.state.photoURLs)

		console.log(this.state.allUsers[0])
		
    return (
			<div>
			{allUsers[0] ? <UserProfileCards allUsers={allUsers} /> : 'nothing to show!' }
			
				</div>
		)
		
  }
}

export default AllBuddies;
