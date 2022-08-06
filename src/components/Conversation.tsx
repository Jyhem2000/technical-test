import { Avatar } from "@mui/material"
import React, { ReactElement } from "react"
import { Conversation as ConversationInterface } from "../types/conversation"
import { stringAvatar } from "../utils/utils"
import styles from '../styles/ConversationList.module.css'
import moment from "moment"
import { MOMENT_DATE_FORMAT } from "../utils/constants"

type Props = React.PropsWithChildren<{
  interlocutor: string
  conversation: ConversationInterface
}>


const Conversation = ({ interlocutor, conversation }: Props): ReactElement => {
  const lastMessageDate = conversation.lastMessageTimestamp ? moment.unix(conversation.lastMessageTimestamp).format(MOMENT_DATE_FORMAT) : 'no message yet'

  return (
    <>
      <Avatar {...stringAvatar(interlocutor)} />
      <div className={styles.conversationInterlocutor}>
        {interlocutor}<br />
        {lastMessageDate}
      </div>
    </>
  )
}


export default Conversation
