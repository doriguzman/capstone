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

	findThreadByUsername = (threads, username) => {
		return threads.find(thread => {
			return ( thread.user_b === username || thread.user_a === username );
		})
  }
  
  createThread = (username) => {
    axios
      .get(`/users/addThread/${username}`)
      .then(() => console.log(`Thread added for ${username}`))
      .catch(err => console.log("Error adding new thread."))
  }

  componentDidMount() {
    axios
      .get("/users/getAllThreads")
      .then(res => {
				const threads = res.data
        this.setState({
          threads: threads
				});

				const { username } = this.props;
				if (username) {
					const activeThread = this.findThreadByUsername(threads, username)

					if (activeThread) {
						this.getMessagesForThread(activeThread.id, username)
					} else {
            this.createThread(this.props.username)
          }
				}
      })
      .then(() => {
        axios
          .get("/users/getAllThreads")
          .then(res => {
            this.setState({
              threads: res.data
            })
          })
          .then(() => {
            console.log("alright, we're in there")
            const activeThread = this.findThreadByUsername(this.state.threads, this.props.user.username)
            console.log(activeThread)
            this.setState({
              activeThread: activeThread
            })
          })
          .catch(err => console.log("Error retrieving all threads."))
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

	getMessagesForThread = (threadId, threadUsername) => {
    axios.get(`/users/getMessages/${threadId}`).then(res => {
      this.setState({
        activeThreadUsername: threadUsername,
        activeThreadId: threadId,
        messages: res.data
      });
		})
		.catch(err => {
			console.log("Oh no! There was an error retrieving your messages. Try refreshing.");
		});
	}

  // Sets the active thread based on username clicked
  handleThreadClick = e => {
    // Filters through the threads for the one with self and the username clicked
		const activeThread = this.findThreadByUsername(this.state.threads, e.target.innerText)
    
		this.getMessagesForThread(activeThread.id, e.target.innerText)
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value});
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

    if (!this.props.user) {
      return <h3 className="please-login"> You have to <Link to="/users/login">log-in</Link> to view your messages. </h3>
    }

    return (
      <div className="messages-parent-container">
        <h1 className="messages-header">
          {activeThreadUsername ? activeThreadUsername : "Inbox"}
        </h1>

        <div className="messages-threads-container">
          <div className="messages-threads-list">
            {threads.map(thread => {
              const userName = thread.user_a === this.props.user.username ? thread.user_b : thread.user_a;
            
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
              {messages ? messages.map(message => {
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
              }) : ""}
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
