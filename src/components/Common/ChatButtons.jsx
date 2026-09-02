import React from 'react'

function ChatButtons() {
const whatsappNumber = "+201038912222";

  const messengerLink = "https://www.facebook.com/profile.php?id=61592222883849"

  return (
    <div className="chat-float">
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn whatsapp-btn"
        title="تواصل عبر واتساب"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
      <a 
        href={messengerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn messenger-btn"
        title="تواصل عبر ماسنجر"
      >
        <i className="bi bi-messenger"></i>
      </a>
    </div>
  )
}

export default ChatButtons