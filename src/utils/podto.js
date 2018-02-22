export const registerSupported = () => 'registerProtocolHandler' in navigator

export const protocolRegistered = () => {
  const storage = window.localStorage;

  return storage.getItem('protocolRegistered') == 'true';
}

export const registrationIgnored = () => {
  const storage = window.localStorage;

  return storage.getItem('protocolIgnored') == 'true';
}

export const ignore = () => {
  const storage = window.localStorage;

  storage.setItem('protocolIgnored', 'true');
}

export const register = () => {
  if(!registerSupported()) {
    throw new Error('Protocol registration is not supported by this browser.')
  }

  const port = window.location.port
  let hostname = window.location.hostname

  if(port != '80') {
    hostname += ':' + port
  }

  navigator.registerProtocolHandler(
    'web+podto',
    '//' + hostname + '/subscribe?q=%s',
    'DotPodcast Player'
  )

  const storage = window.localStorage;

  storage.setItem('protocolRegistered', 'true');
  storage.setItem('protocolIgnored', 'false');
}
