import React, {useContext} from "react"

export const Webproperty = React.createContext({});

export default function useWebProperty() {
    return useContext(Webproperty)
}