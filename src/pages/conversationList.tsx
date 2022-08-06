import { FC, ReactElement, useState } from 'react'
import styles from '../styles/ConversationList.module.css'
import { getLoggedUser } from '../utils/getLoggedUser'
import { Conversation as ConversationInterface } from '../types/conversation'
import Link from 'next/link'
import Conversation  from '../components/Conversation'
import { Button, Container, Divider, FormControl, InputLabel, ListItem, MenuItem, Select, Stack, Typography } from '@mui/material'
import { PATH_CONVERSATION_DETAIL, URL_CONVERSATIONS, URL_USERS, URL_CONVERSATION, RequestMethods } from '../utils/constants'
import { User as UserInterface,} from '../types/user'
import { GetServerSideProps } from 'next'
import { buildFetchOptions } from '../utils/utils'

type Props = React.PropsWithChildren<{
  conversations: ConversationInterface[]
  users: UserInterface[]
}>


const ConversationList: FC = ({ conversations, users }: Props): ReactElement => {
  const [stateConversations, setStateConversations] = useState(conversations)
  const loggedUserId = getLoggedUser().id
  const loggedUserNickname = getLoggedUser().nickname

  /**
   * add new conversation
   * @param user
   */
  const addNewConversation = async (user: UserInterface) => {
    const options = buildFetchOptions(
      RequestMethods.POST,
      JSON.stringify({
        recipientId: user.id,
        recipientNickname: user.nickname,
        senderId: loggedUserId,
        senderNickname: loggedUserNickname
      })
    )

    const response = await fetch(URL_CONVERSATION + loggedUserId, options)
    const newConv = await response.json()
    setStateConversations([...stateConversations, newConv])
  }

  /**
   * retrieve users for whom a conversation is already in progress
   */
  const filteredUsers = () => {
    const existingConvFromUsers = stateConversations.map((c: ConversationInterface) => c.senderId === loggedUserId ? c.recipientId : c.senderId)
    return users.filter((user: UserInterface) => !existingConvFromUsers.includes(user.id) && user.id !== loggedUserId)
  }


  return (
    <Container maxWidth={false}>
      <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2}>
        {stateConversations?.map((c: ConversationInterface) => {
          const interlocutor = loggedUserId === c.recipientId ? c.senderNickname : c.recipientNickname
          return (
            <ListItem key={c.id} className={styles.conversationItem}>
              <Link href={{ pathname: PATH_CONVERSATION_DETAIL + c.id, query: { interlocutor }}}>
                <a><Conversation interlocutor={interlocutor} conversation={c} /></a>
              </Link>
            </ListItem>
          )
        })}
      </Stack>

      {!!filteredUsers().length &&
        <>
          <Divider variant="middle" className={styles.divider}/>
          <Typography>Create new conversation</Typography>
          <FormControl fullWidth>
            <InputLabel id="interlocutor">Interlocutor</InputLabel>
            <Select labelId="interlocutor" id="interlocutor" value={''} onChange={() => null}>
              {filteredUsers().map((user: UserInterface) => (
                <MenuItem key={user.id} value={user.id} onClick={() => addNewConversation(user)}>{user.nickname}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      }

      <div className={styles.actions}>
        <Link href='/'>
          <a className="btn"><Button variant="outlined">Home</Button></a>
        </Link>
      </div>
    </Container>
  )
}


/**
 * retrieve all conversations and users (TODO better filter request)
 */
export const getServerSideProps: GetServerSideProps = async(context) => {
  const convRes = await fetch(URL_CONVERSATIONS + getLoggedUser().id)
  const conversations: ConversationInterface[] = await convRes?.json() || []
  const userRes = await fetch(URL_USERS)
  const users: UserInterface[] = await userRes?.json() || []
  console.log("getServerSideProps => conversations length", conversations.length)
  return {
    props: {
      conversations,
      users
    }
  }
}


export default ConversationList
