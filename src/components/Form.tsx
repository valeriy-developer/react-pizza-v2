import { useState } from 'react'
import Button from './Button'
import Input from './Input'

const Form = () => {
  const [phoneValue, setPhoneValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')

  return (
    <form className="form" action="#">
      <fieldset>
        <legend className="form__title">Контакти для замовлення</legend>
        <div className="form__content-wrapper">
          <Input
            name="Phone"
            text="Enter your phone number..."
            inputValue={phoneValue}
            onChangeInput={event => setPhoneValue(event.target.value)}
          />
          <Input
            name="Email"
            text="Enter your email..."
            inputValue={emailValue}
            onChangeInput={event => setEmailValue(event.target.value)}
          />
        </div>
      </fieldset>
      <Button text="Надіслати" className="form__btn" />
    </form>
  )
}

export default Form
