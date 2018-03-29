import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../Stylesheets/messages.css";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: [],
      activeThreadUsername: "",
      activeThreadId: "",
      messages: [],
      newMessage: ""
    };
	}

	// finds the thread (has id, user_a, user_b) using a username
	findThreadByUsername = (threads, username) => {
		return threads.find(thread => {
			return (
				thread.user_b === username ||
				thread.user_a === username
			);
		})
	}

	getMessagesForThread = (threadId, threadUsername) => {
    axios.get(`/users/getMessages/${threadId}`).then(response => {
      this.setState({
        activeThreadUsername: threadUsername,
        activeThreadId: threadId,
        messages: response.data
      });
		})
		.catch(err => {
			console.log("Oh no! There was an error retrieving your messages. Try refreshing.");
		});
	}

	createThread = (username) => {
		axios
			.get(`/users/addThread/${username}`)
			.then(() => console.log("you added a thread for: ", username))
			.catch(err => console.log("There was an error!: ", err))
	}

	getAllThreads = () => {
		console.log("getting all threads again")
		axios
			.get("/users/getAllThreads")
			.then(response => {
				const threads = response.data;
				this.setState({ threads: threads });

				console.log("got all the threads: ", this.state.threads)
			})
			.catch(err => console.log("Error retrieving all threads."))
	}

  componentDidMount() {
    axios
      .get("/users/getAllThreads")
      .then(response => {
				const threads = response.data
        this.setState({
          threads: threads
				});

				const { username } = this.props;
				if (username) {
					const activeThread = this.findThreadByUsername(threads, username)

					if (activeThread) {
						this.getMessagesForThread(activeThread.id, username)
					} else {
						this.createThread(username) // this works sigh
					}
				}
      })
      .catch(err => {
        console.log("Oh no! There was an error retrieving your threads. Try refreshing.");
      });
  }

	componentWillReceiveProps(nextProps){
		if (nextProps.username) {
			const activeThread = this.findThreadByUsername(this.state.threads, nextProps.username)
			if (activeThread) {
				this.getMessagesForThread(activeThread.id, nextProps.username)
			}
		}
	}

  // Sets the active thread based on username clicked
  handleThreadClick = e => {
    // Filters through the threads for the one with self and the username clicked
		const activeThread = this.findThreadByUsername(this.state.threads, e.target.innerText)
    
		this.getMessagesForThread(activeThread.id, e.target.innerText)
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = e => {
		e.preventDefault();
    const { activeThreadId, activeThreadUsername, newMessage } = this.state;
    axios
      .post("/users/addMessage", { threadId: activeThreadId, body: newMessage })
      .then(() => {
        this.setState({
          newMessage: "",
				});

				this.getMessagesForThread(activeThreadId, activeThreadUsername)
      });
  };

  render() {
    const {
      threads,
      activeThreadUsername,
      messages,
      newMessage
    } = this.state;

		// if (!this.props.user) {
		// 	const redirect = window.location.href="http://localhost:3000/users/login"
		// 	setInterval(redirect, 3000)
		// 	return "You must be logged in. Redirecting..."
		// }

    return (
      <div className="messages-parent-container">
        <h1 className="messages-header">
          {activeThreadUsername ? activeThreadUsername : "Inbox"}
        </h1>

        <div className="messages-threads-container">
          <div className="messages-threads-list">
            {threads.map(thread => {
							const userName = 
								thread.user_a === this.props.user.username? thread.user_b : thread.user_a
							return (
								<div className="messages-single-thread">
									<Link to={`/users/messages/${userName}`}>{userName}</Link>
								</div>
							)
						})}
          </div>

          <div className="messages-thread-content">
            {activeThreadUsername
              ? ""
              : "Adventure waits for now one... Click on someone to continue chatting!"}
            <div className="messages-thread-body">
              {messages.map(message => {
                if (message.username === activeThreadUsername) {
                  return (
                    <div className="messages-other-user">
                      {message.body}
                      <br />
                      <span className="timestamp">
                        ({message.timestamp.slice(0, 21)}){" "}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div className="messages-self">
                      {message.body}
                      <br />
                      <span className="timestamp">
                        {" "}
                        ({message.timestamp.slice(0, 21)})
                      </span>
                    </div>
                  );
                }
              })}
            </div>

            <div className="messages-thread-form">
              {activeThreadUsername ? (
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

      </div>
		);      
		
		

  }
}

export default Messages;
