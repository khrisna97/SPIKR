import React, {useContext} from "react"

export const PersonalWebsocket = React.createContext({});

export default function useGroupWebsocket() {
    return useContext(PersonalWebsocket)
}