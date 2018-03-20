import React, { Component } from 'react';



class MatchedBuddies extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:this.props.user

        }
    }

render(){
    console.log(this.state)
    return(
        <div>


            <h2> hi </h2>
            </div>
    )
}

}

export default MatchedBuddies;