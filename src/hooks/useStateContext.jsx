import * as React from 'react'
import { createContext } from 'react'

export const stateContext = createContext();

const getFreshContext = () => {
  if (!localStorage.getItem('context')) {
    localStorage.setItem('context', JSON.stringify({
      participantId: 0,
      timeTaken: 0,
      selectedOptions: []
    }))
  }
  return JSON.parse(localStorage.getItem('context'))
}

export default function useStateContext() {
  const { context, setContext } = React.useContext(stateContext)
  return {
    context,
    setContext: obj => { setContext({ ...context, ...obj }) },
    resetContext: () => {
      localStorage.removeItem('context')
      setContext(getFreshContext())
    }
    }
}

export function ContextProvider({children}) {
  const [context, setContext] = React.useState(getFreshContext())
  React.useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context))
  }, [context])
  
  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  )
}
