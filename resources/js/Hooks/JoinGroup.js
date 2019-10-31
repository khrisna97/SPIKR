import React, {useContext} from "react"

export const GroupWebSocket = React.createContext({});

export default function useGroupWebsocket() {
    return useContext(GroupWebSocket)
}