import React, {useContext} from "react"

export const PersonalChannelHook = React.createContext({});

export default function usePersonalChannel() {
    return useContext(PersonalChannelHook)
}