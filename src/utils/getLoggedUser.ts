import type { User } from '../types/user'

// Default way to use a logged user
// Feel free to update the user ID for your tests
// or enhance it with better data source, or better user management
export const getLoggedUser = (): User => ({
  id: 1,
  nickname: 'Thibaut',
  token: 'xxxx'
})