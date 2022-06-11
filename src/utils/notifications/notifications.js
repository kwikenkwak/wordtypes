import React, { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Notifications from 'components/Notifications'
import PropTypes from 'prop-types'

const defaultNotify = (message) => {
  console.warn('The notify function was called but no matching' +
    ` NotifyProvider was found in the tree above your message was ${message}`)
}

export const NotifyContext = createContext({ notify: defaultNotify })

const NotifyProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const remove = (message) => {
    setMessages((messages) => {
      for (let idx = 0; idx < messages.length; idx++) {
        if (messages[idx].id === message.id) {
          messages.splice(idx, 1)
          break
        }
      }
      return messages.slice()
    })
  }

  const notify = (message) => {
    const messageObj = { message, id: uuid() }
    messages.splice(0, 0, messageObj)
    setMessages(messages.slice())
    setTimeout(() => remove(messageObj), 5000)
  }

  return (<>
      <Notifications messages={messages} />
      <NotifyContext.Provider value={{ notify }}>
          {children}
         </NotifyContext.Provider>
    </>)
}

NotifyProvider.propTypes = {
  children: PropTypes.array
}

export { NotifyProvider }
