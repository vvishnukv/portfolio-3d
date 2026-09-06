import { useState, useEffect, useRef } from 'react'

export default function TypingEffect({ texts, speed = 80, deleteSpeed = 50, pause = 2500 }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentText = texts[textIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentText.substring(0, displayText.length + 1))

        if (displayText.length === currentText.length) {
          // Finished typing — pause before deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pause)
          return
        }
        timeoutRef.current = setTimeout(handleTyping, speed)
      } else {
        // Deleting
        setDisplayText(currentText.substring(0, displayText.length - 1))

        if (displayText.length === 0) {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
          return
        }
        timeoutRef.current = setTimeout(handleTyping, deleteSpeed)
      }
    }

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pause])

  return (
    <span className="typing-effect">
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '2.5px',
          height: '1.1em',
          background: 'var(--gold)',
          marginLeft: '2px',
          borderRadius: '1px',
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'text-bottom',
        }}
      />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
