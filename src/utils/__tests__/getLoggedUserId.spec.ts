import { getLoggedUser } from '../getLoggedUser'

describe('getLoggedUserId', () => {
  it('should return logged user id', () => {
    const expected = 1
    expect(getLoggedUser().id).toEqual(expected)
  })
})

describe('getLoggedUserNickname', () => {
  it('should return logged user nickname', () => {
    const expected = 'Thibaut'
    expect(getLoggedUser().nickname).toEqual(expected)
  })
})