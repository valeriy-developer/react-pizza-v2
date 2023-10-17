import classNames from 'classnames'
import { KeyboardEventHandler, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface IProps {
  children: React.ReactNode
  isOpened: boolean
  onClose: () => void
  wrappedClass?: string
}

const Modal = ({ children, isOpened, onClose, wrappedClass }: IProps) => {
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpened === true) {
      document.body.classList.add('scroll-fixed')
    } else {
      document.body.classList.remove('scroll-fixed')
    }
  }, [isOpened])

  const modalContent = (
    <div
      className={classNames('modal', isOpened && 'modal--opened', wrappedClass)}
    >
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

  return <>{createPortal(modalContent, document.body)}</>
}

export default Modal

Modal.defaultProps = {
  wrappedClass: null,
}
