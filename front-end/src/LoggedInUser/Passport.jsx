import React from 'react'
import axios from 'axios'

class Passport extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        // const img = this.refs.image
      }


    render(){
        return(
            <div>
                <canvas ref= 'canvas' width= {640} height={425}/>
    HIIIIIII
                </div>


        )
    }
}

export default Passport; 