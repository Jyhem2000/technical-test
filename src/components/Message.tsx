import moment from "moment"
import React, { ReactElement } from "react"
import styles from '../styles/ConversationDetail.module.css'
import { Message as MessageInterface } from "../types/message"
import { MOMENT_DATE_FORMAT } from "../utils/constants"
import { getLoggedUserId } from "../utils/getLoggedUserId"

type Props = React.PropsWithChildren<{
  message: MessageInterface
  interlocutor: string
}>


const Message = ({ message, interlocutor }: Props): ReactElement => {
  const messageFromLoggedUser = message.authorId === getLoggedUserId()
  const author = !!interlocutor.length && !messageFromLoggedUser ? interlocutor : 'You'
  const messageDate = moment.unix(message.timestamp).format(MOMENT_DATE_FORMAT)
  
  return (
    <div className={`${messageFromLoggedUser ? styles.messageFromLoggedUser : styles.messageFromRecipient}`}>
      <p className={styles.messageAuthor}>
          {`${author} - `}
          <span className={styles.messageDate}>{messageDate}</span>
      </p>
      <p className={styles.messageContent}>
        {message.body}
      </p>
    </div>
  )
}


export default Message
