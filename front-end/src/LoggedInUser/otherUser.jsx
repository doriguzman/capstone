import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'


class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInAs: '',
            otherUser: '',
            followees: [],
            followers: [],
            photos: [],
            followStatus: false
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    // Grab logged in user's information 
    getUserInfo = () => {
        const username = this.props.match.params.username
        axios
            .get(`/users/userAttributes${username}`)
            .then(res => {
                let user = res.data
                this.setState({
                    user: this.props.user,
                    otherUser:user
                })
            })
            .then(() => {
                this.getUserPhotos()
                this.getUserFollowees()
                this.getUserFollowers()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // // Get logged in user's photos 
    // getUserPhotos = () => {
    //     const { user } = this.state
    //     axios
    //         .get(`/users/u/${user.user_id}/photos`)
    //         .then(res => {
    //             let photos = res.data.data
    //             this.setState({
    //                 photos: photos
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }

    // // Get logged in user's followees 
    // getUserFollowees = () => {
    //     const { user } = this.state
    //     axios
    //         .get(`/users/u/${user.user_id}/followees`)
    //         .then(res => {
    //             let followees = res.data.data
    //             this.setState({
    //                 followees: followees
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }

    // // Get logged in user's followers 
    // getUserFollowers = () => {
    //     const { loggedInAs, user } = this.state
    //     axios
    //         .get(`/users/u/${user.user_id}/followers`)
    //         .then(res => {
    //             let followers = res.data.data
    //             let userFoundAsFollowee = followers.find(item => item.follower_id === loggedInAs.user_id)

    //             // If logged in user is found in the followers list, set followStatus to true
    //             if (userFoundAsFollowee) {
    //                 this.setState({
    //                     followStatus: true,
    //                     followers: followers
    //                 })
    //             } else {
    //                 this.setState({
    //                     followStatus: false,
    //                     followers: followers
    //                 })
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }

    // Render the user's profile based on user ID 
    // renderProfile = () => {
    //     const { loggedInAs, user, photos, followees, followers, followStatus } = this.state
    //     if (user) {
    //         return <Profile
    //             loggedInAs={loggedInAs}
    //             user={user}
    //             photos={photos}
    //             followees={followees}
    //             followers={followers}
    //             followStatus={followStatus}
    //             handleFollow={this.handleFollow}
    //             handleUnfollow={this.handleUnfollow} />
    //     } else {
    //         return <h1>Must be logged in</h1>
    //     }
    // }

    // renderFollowees = () => {
    //     const { followees, showModalFollowees } = this.state
    //     return <Followees
    //         followees={followees} />
    // }

    // renderFollowers = () => {
    //     const { followers, showModalFollowers } = this.state
    //     return <Followers
    //         followers={followers} />
    // }





    // handleFollow = () => {
    //     console.log('Switching follow status to ' + !this.state.followStatus)
    //     const { loggedInAs, user } = this.state

    //     axios
    //         .post(`/users/u/${loggedInAs.user_id}/follow`, {
    //             followee_id: user.user_id
    //         })
    //         .then(res => {
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // handleUnfollow = () => {
    //     console.log('Switching follow status to ' + !this.state.followStatus)
    //     const { loggedInAs, user } = this.state

    //     axios
    //         .post(`/users/u/${loggedInAs.user_id}/unfollow`, {
    //             followee_id: user.user_id
    //         })
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // // editUser = () => {
    // //     const { user } = this.state
    // //     return <EditUser user={user} />
    // // }

    render() {
        console.log(this.state)
        console.log('this is the other user component')

        return (
            <div>
                <Route path="/users/u/:username/profile" render={this.getUserInfo} />

            </div>
        )
    }
}

export default User

