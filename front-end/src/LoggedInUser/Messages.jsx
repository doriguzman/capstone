import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			threads: [],
			activeThreadUsername: "",
			activeThreadId: "",
			messages: [],
			newMessage: ""
		}
	}

	componentWillMount() {
		axios
			.get("/users/getAllThreads")
			.then(response => {
				// console.log(`response.data: `,response.data)
				this.setState({
					threads: response.data
				})
			})	
			.catch(err => {
				console.log("Oh no! There was an error retrieving your threads.")
			})
	}

	handleThreadClick = e => {
		console.log(`threads: `, this.state.threads)
		let activeId = this.state.threads.filter(thread => {
			return thread.user_b === e.target.innerText || thread.user_a === e.target.innerText
		})
		e.persist()
		console.log("active id: ", activeId)
		axios
			.get(`/users/getMessages/${activeId[0].id}`)
			.then(response => {
				this.setState({
					activeThreadUsername: e.target.innerText,
					activeThreadId: activeId[0].id,
					messages: response.data
				})
			})
	}

	handleInput = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleFormSubmit = e => {
		const { activeThreadId, newMessage } = this.state;
		axios
			.post("/users/addMessage", { threadId: activeThreadId, body: newMessage })
			.then(() => {
				this.setState({
					newMessage: ""
				})
			})
	}


	render() {
		const { threads, activeThreadUsername, messages, newMessage } = this.state;
		console.log(this.state)

		return(
			<div>
				<h1>My Messages</h1>
				<div>
					{threads.map(thread => (
						<div onClick={this.handleThreadClick} value={thread.user_a === this.props.user.username ? thread.user_b : thread.user_a}>
							{thread.user_a === this.props.user.username ? thread.user_b : thread.user_a}
						</div>
					))}
				</div>
				<hr />
				<div>
					{messages.map(message => {
						if (message.username === activeThreadUsername) {
							return (
								<div className="messages-other-user">
									{activeThreadUsername}: {message.body}
								</div>
							)
						} else {
							return (
								<div className="messages-self">
									{this.props.user.username}: {message.body}
								</div>
							)
						}
					})}
				</div>
				<div>
					<form onSubmit={this.handleFormSubmit}>
						<input
							type="text"
							name="newMessage"
							value={newMessage}
							onChange={this.handleInput}
							placeholder="Enter your message here..."
						/>
						<input type="submit" value="Go" />
					</form>
				</div>
			</div>
		)
	}
}

export default Messages;