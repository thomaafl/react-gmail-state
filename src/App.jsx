/* eslint-disable no-unused-vars */
import Header from './components/Header'
import { useState, useEffect } from 'react'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [emailsToShow, setEmailsToShow] = useState(emails)
  const [hideRead, setHideRead] = useState(false)
  const [showStarred, setShowStarred] = useState(true) 

  const starredEmails = emails.filter((email) => email.starred).length
  const allEmails = emails.length
  const toggleReadStatus = (index) => {
    const updatedEmails = emails.map((email, i) => i === index ? { ...email, read: !email.read } : email)
    setEmails(updatedEmails)
  }

  const toggleStarredStatus = (index) => {
    const updatedEmails = emails.map((email, i) => i === index ? { ...email, starred: !email.starred } : email)
    setEmails(updatedEmails)
  }

  useEffect(() => {
    let filteredEmails = emails

    if (hideRead) {
      filteredEmails = filteredEmails.filter((email) => !email.read)
    }

    if (showStarred) {
      filteredEmails = filteredEmails.filter((email) => email.starred)
    }

    setEmailsToShow(filteredEmails)
  }, [emails, hideRead, showStarred])

  const showAll = () => {
    setShowStarred(false)
  }

  const toggleHideRead = () => {
    setHideRead(!hideRead)
  }

  const toggleShowStarred = () => {
    setShowStarred(!showStarred)
  }

  const filterEmails = () => {
    if (hideRead) {
      const unread = emails.filter(email => !email.read)
      setEmailsToShow(unread)
    } else {
      setEmailsToShow(emails)
    }

  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${!showStarred ? 'active' : ''}`} 
            onClick={showAll}>
            <span className="label">Inbox</span>
            <span className="count">{allEmails}</span>
          </li>
          <li
            className={`item ${showStarred ? 'active' : ''}`} 
            onClick={toggleShowStarred}>
            <span className="label">Starred</span>
            <span className="count">{starredEmails}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {toggleHideRead(), filterEmails()}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{emailsToShow.map((email, index) => (
        <li 
        key={index}
        className={`email ${email.read ? 'read' : 'unread'}`}
        >
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={() => toggleReadStatus(index)}/>
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => toggleStarredStatus(index)}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
      ))}</main>
    </div>
  )
}

export default App
