import { FC, ReactElement } from 'react'
import styles from '../styles/ConversationList.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { Conversation as ConversationInterface } from '../types/conversation'
import Link from 'next/link'
import Conversation  from '../components/Conversation'
import { Container, ListItem, Stack } from '@mui/material'
import { PATH_CONVERSATION_DETAIL, URL_CONVERSATIONS } from '../utils/constants'

type Props = React.PropsWithChildren<{
  conversations?: ConversationInterface[];
}>


const ConversationList: FC = ({ conversations }: Props): ReactElement => (
  <Container maxWidth={false}>
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='center'
      spacing={2}
    >
      {conversations?.map((c: ConversationInterface) => {
        const interlocutor = getLoggedUserId() === c.recipientId ? c.senderNickname : c.recipientNickname
        return (
          <ListItem key={c.id} className={styles.conversationItem}>
            <Link href={{ pathname: PATH_CONVERSATION_DETAIL + c.id, query: { interlocutor }}}>
              <a><Conversation interlocutor={interlocutor} conversation={c} /></a>
            </Link>
          </ListItem>
        )
      })}
    </Stack>
  </Container>
)


export const getServerSideProps = async() => {
  const conversations: ConversationInterface[] = await fetch(URL_CONVERSATIONS + getLoggedUserId()).then(r => {
    if (r.ok) {
      return r.json()
    }
    console.error('Network error while calling API')
  }).catch((error) => {
    console.error('Fetch error on getting conversations :', error.message)
  })

  return {
    props: {
      conversations
    }
  }
}


export default ConversationList
