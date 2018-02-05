import { getFile } from 'blockstack';

const getSubscriptionList = (username) => {
  console.log('Getting podcasts', username)
  return getFile(
    'subscriptions.json',
    {
      decrypt: true,
      username: username
    }
  )
}

export { getSubscriptionList }
