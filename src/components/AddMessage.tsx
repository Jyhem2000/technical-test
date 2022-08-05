import { ReactElement, useState  } from 'react'
import { IconButton, TextField } from "@mui/material"
import { RequestMethods, URL_MESSAGES } from "../utils/constants"
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { Message as MessageInterface} from '../types/message'
import { Send } from '@mui/icons-material'
import { buildFetchOptions, getTimestamp } from '../utils/utils'
import moment from 'moment'

type Props = React.PropsWithChildren<{
  conversationId: number
  updateMessages: (message: MessageInterface) => void
}>


const AddMessage = ({ conversationId, updateMessages }: Props): ReactElement => {
  const [message, setMessage] = useState('')

  /**
   * send action button
   */
  const SendButton = (): ReactElement => (
    <IconButton onClick={handleSubmit}>
      <Send />
    </IconButton>
  )

  /**
   * handle form submission
   * @param event 
   */
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const JSONdata = JSON.stringify({
      conversationId,
      timestamp: getTimestamp(),
      body: message,
      authorId: getLoggedUserId()
    })

    const response = await fetch(URL_MESSAGES + conversationId, buildFetchOptions(RequestMethods.POST, JSONdata))
    const result = await response.json()
    updateMessages(result)
    setMessage('')
  }


  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="reply"
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        InputProps={{ endAdornment: <SendButton /> }}
      />
    </form>
  )
}


export default AddMessage
