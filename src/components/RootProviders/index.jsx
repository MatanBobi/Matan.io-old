import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"

// Hooks
import useToggle from "../../hooks/useToggle"
import useLocalStorage from "../../hooks/useLocalStorage"

export const RootProviders = ({ children }) => {
    const [localStorageIsDayMode, setLocalStorageIsDayMode] = useLocalStorage(
        "matanio.lightmode",
        true
    )
    const [isDayMode, toggleDayMode] = useToggle(localStorageIsDayMode)

    useEffect(() => {
        document.body.dataset.theme = isDayMode ? "light" : "dark"
        setLocalStorageIsDayMode(isDayMode)
    }, [isDayMode])

    useEffect(() => {}, [])

    const theme = {
        isDayMode,
        toggleDayMode,
    }

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
