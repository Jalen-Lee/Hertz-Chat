import rootStore from '../store'
import { createContext, useContext } from 'react'

export const StoreContext = createContext(rootStore)

export default function useStore(){
  return useContext(StoreContext)
}
