import React, { createContext, useMemo, useState } from 'react'

interface IFormContext {
  formOpened: boolean
  completeModalOpened: boolean
  setFormOpened: React.Dispatch<React.SetStateAction<boolean>>
  setCompleteModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormContext = createContext<IFormContext>({
  formOpened: false,
  completeModalOpened: false,
  setFormOpened: () => {},
  setCompleteModalOpened: () => {},
})

export interface IFormContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

const FormContextProvider: React.FC<IFormContextProviderProps> = ({
  children,
}) => {
  const [formOpened, setFormOpened] = useState<boolean>(false)
  const [completeModalOpened, setCompleteModalOpened] = useState<boolean>(false)

  const value = useMemo(() => {
    return {
      formOpened,
      completeModalOpened,
      setFormOpened,
      setCompleteModalOpened,
    }
  }, [formOpened, completeModalOpened])

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export default FormContextProvider
