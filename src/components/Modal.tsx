import { KeyboardEventHandler, useCallback } from 'react'

interface IProps {
  children: React.ReactNode
  isOpened: boolean
  onClose: () => void
}

const Modal = ({ children, isOpened, onClose }: IProps) => {
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    },
    [onClose]
  )

  if (isOpened) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  return (
    <div className={!isOpened ? 'modal' : 'modal modal--opened'}>
      <div
        className="modal__backdrop"
        onClick={() => onClose()}
        onKeyDown={onKeyDown}
        role="button"
        aria-label="Close modal"
        tabIndex={0}
      />
      <div className="modal__wrapper">
        <div className="modal__header">
          <button
            className="modal__close-btn"
            onClick={() => onClose()}
            type="button"
          >
            <span className="modal__line" />
            <span className="modal__line" />
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
