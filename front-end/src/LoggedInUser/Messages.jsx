import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import "../Stylesheets/messages.css";

class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			threads: [],
			activeThreadUsername: "",
			activeThreadId: "",
			messages: [],
			newMessage: "",
			submitted: ""
		}
	}

	componentWillMount() {
		axios
			.get("/users/getAllThreads")
			.then(response => {
				this.setState({
					threads: response.data
				})
			})	
			.catch(err => {
				console.log("Oh no! There was an error retrieving your threads. Try refreshing.")
			})
	}

	// Sets the active thread based on username clicked
	handleThreadClick = e => {
		// Filters through the threads for the one with self and the username clicked
		let activeId = this.state.threads.filter(thread => {
			return thread.user_b === e.target.innerText || thread.user_a === e.target.innerText
		})
		e.persist() // Persists the event so we can set state in axios call below

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
		const { activeThreadId, activeThreadUsername, newMessage } = this.state;
		axios
			.post("/users/addMessage", { threadId: activeThreadId, body: newMessage })
			.then(() => {
				this.setState({
					newMessage: "",
					submitted: `Your message has been sent to ${activeThreadUsername}!`
				})
			})
	}


	render() {
		const { threads, activeThreadUsername, messages, newMessage, submitted } = this.state;

		return(
			<div className="messages-parent-container">
				<h1 className="messages-header">{activeThreadUsername ? activeThreadUsername : "My Messages"}</h1>

				<div className="messages-threads-container">
					<div className="messages-threads-list">
						{threads.map(thread => (
							<div
								className="messages-single-thread"
								onClick={this.handleThreadClick}
								value={thread.user_a === this.props.user.username ?
									thread.user_b : thread.user_a}
							>
								{thread.user_a === this.props.user.username ? thread.user_b : thread.user_a}
							</div>
						))}
					</div>

					<div className="messages-thread-content">
						{activeThreadUsername ? "" : "Adventure waits for now one... Click one someone to continue chatting!"}
						<div className="messages-thread-body">
							{messages.map(message => {
								if (message.username === activeThreadUsername) {
									return (
										<div className="messages-other-user">
											{/* <span className="bold">{activeThreadUsername}</span>: */}
											{message.body}
											<br />
											<span className="timestamp">({message.timestamp.slice(0, 21)}) </span>
										</div>
									)
								} else {
									return (
										<div className="messages-self">
											{/* <span className="bold"> {this.props.user.username}</span>:  */}
											{message.body}
											<br />
											<span className="timestamp"> ({message.timestamp.slice(0, 21)})</span> 
										</div>
									)
								}
							})}
						</div>

						<div className="messages-thread-form">
							{activeThreadUsername
								? (
									<form onSubmit={this.handleFormSubmit}>
										<input
											type="text"
											name="newMessage"
											value={newMessage}
											onChange={this.handleInput}
											placeholder="Enter your message here..."
											className="messages-input"
										/>
										<input type="submit" value="Go" className="messages-submit" />
								</form>
								) : ""}
							{submitted}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Messages;