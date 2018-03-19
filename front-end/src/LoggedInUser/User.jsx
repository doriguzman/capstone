import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import UserProfile from './UserProfile'
// import EditUserProfile from './EditUserProfile'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userID: '', 
            bffs:'',
        }
    }

    getUserInfo= () => {
        const id = this.props.match.params.id
        axios
        .get(`/users/u/${id}`)
        .then(res => {
            let UserInfo = res.data.data 
            // console.log("res.data",res.data.data)
    
            this.setState({
                user: UserInfo,
                userID: UserInfo.user_id
            })
            console.log('UserINFO: ' , UserInfo)
    
            this.getUserLikes()
        })
        .catch(err =>{
            console.log(err)
        })
    
    }

    componentDidMount() {
        console.log("component mounted!")
        this.getUserInfo()
       
    }

    // Render the user's profile based on user ID 
    renderUserProfile = () => {
        const {user}= this.state
        if (user) {
          return <UserProfile user= {user} />
        } else {
          return <h1>Must be logged in</h1>
        }
      }

      getUserLikes = () => {
        const { userID } = this.state
        const id = userID
        console.log('we about to call axios')
        axios
            .get(`/users/u/${id}/likes`)
            .then(res => {
                let Following = res.data.data
                console.log(Following)
                this.setState({
                    bffs: bffs, 
                })

            })
    }

    renderLikes = () => {
        const { bffs } = this.state;
        return <Bffs bffs = { bffs }/>
    }

    editUserProfile = () => {
        const { user } = this.state;
        return <EditUserProfile user = {user}/>
    }

    render() {
        console.log("The state:", this.state)

        return (
            <div>
                <Route path="/me/:myusername" render={this.renderUserProfile} />
                <Route path="/me/:myusername/edit" render={this.editUserProfile} />
                <Route path="/me/:myusername/likes" render={this.renderLikes} />
            </div>
        )
    }
}

export default User;



