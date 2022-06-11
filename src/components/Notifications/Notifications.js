import React from 'react'
import ReactDOM from 'react-dom'
import * as S from './Notifications.style.js'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Collapser from 'components/Collapser'

export const Notifications = ({ messages = [] }) => {
  return ReactDOM.createPortal(
    <S.Notifications>
      <S.Messages>
        <TransitionGroup>
        {messages.map((m) =>
          <CSSTransition key={m.id} timeout={200} classNames="message">
          {state =>
          <S.Message>
          <Collapser timeout={200} active={state === 'entering' || state === 'entered'}>
          {typeof (m.message) === 'string'
            ? <S.TextMessage >{m.message}</S.TextMessage>
            : m.message
          }
          </Collapser>
          </S.Message>
          }
          </CSSTransition>
        )}
        </TransitionGroup>
      </S.Messages>
    </S.Notifications>
    , document.querySelector('#root'))
}
