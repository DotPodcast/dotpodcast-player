export const anonymousPlayAlert = () => {
  const key = "viewed_anonymous_play_alert";

  if (!localStorage.getItem(key)) {
    alert("Thanks for trying us out. For full functionality, such as subscribing and supporting podcasters, you need the Blockstack Browser installed. Enjoy the episode!");
    localStorage.setItem(key, true)
  }
}

export const anonymousSubscribeAlert = () => {
  alert("To subscribe, you need the BlockStack browser so your data is kept secure from prying eyes.");
}
