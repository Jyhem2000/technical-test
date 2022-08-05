import { FC, useState  } from 'react'
import { Message as MessageInterface} from '../../types/message'
import { MOMENT_DATE_FORMAT_CONVERSATION, URL_MESSAGES } from '../../utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/ConversationDetail.module.css'
import Message from '../../components/Message'
import moment from 'moment'
import { Button } from '@mui/material'
import AddMessage from '../../components/AddMessage'

type Props = React.PropsWithChildren<{
  messages: MessageInterface[]
}>


const ConversationDetail: FC = ({ messages }: Props) => {
  const router = useRouter()
  const interlocutor = router.query?.interlocutor.toString() || ''
  const id = parseInt(router.query?.id.toString() || '0')
  const lastMessageDate = moment.unix(messages[messages.length-1].timestamp).format(MOMENT_DATE_FORMAT_CONVERSATION)

  const [stateMessages, setStateMessages] = useState(messages)

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.authors}>{interlocutor} - You</div>
        <div className={styles.lastMessageDate}>Last message <span className={styles.date}>{lastMessageDate}</span></div>
      </div>

      <div className={styles.messageList}>
        {stateMessages.map((m: MessageInterface) => (
          <Message
            key={m.id}
            message={m}
            interlocutor={interlocutor}
          />
        ))}
      </div>

      <div className={styles.reply}>
        <AddMessage conversationId={id} updateMessages={(message: MessageInterface) => setStateMessages([...stateMessages, message])} />   
      </div>

      <div className="actions">
        <Link href='/'>
          <a className="btn"><Button variant="outlined">Home</Button></a>
        </Link>&nbsp;
        <Link href='/conversationList'>
          <a className="btn"><Button variant="outlined">Conversations</Button></a>
        </Link>
      </div>
    </>
  )
}


export const getServerSideProps = async({ params }) => {
  const messages: MessageInterface[] = await fetch(URL_MESSAGES + params.id).then(r => {
    if (r.ok) {
      return r.json()
    }
    console.error('Network error while calling API')
  }).catch((error) => {
    console.error('Fetch error on getting messages :', error.message)
  })

  return {
    props: {
      messages
    }
  }
}


export default ConversationDetail
