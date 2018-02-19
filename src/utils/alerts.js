export const anonymousPlayAlert = () => {
  if (!localStorage.getItem("viewed_anonymous_browsing_alert")) {
    alert("Thanks for trying us out. For full functionality, such as subcribing and supporting podcasters, you need the Blockstack Browser installed. Enjoy the episode!");
    localStorage.setItem("viewed_anonymous_browsing_alert", true)
  }
}

