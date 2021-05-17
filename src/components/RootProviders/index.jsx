import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"

// Hooks
import useToggle from "../../hooks/useToggle"

const setModeByTime = (setLightMode, setDarkMode, isDayMode) => {
    const currentTime = new Date().getHours()
    if (currentTime > 6 && currentTime < 20 && !isDayMode) {
        setLightMode()
        return
    } else if ((currentTime <= 6 || currentTime >= 20) && isDayMode) {
        setDarkMode()
        return
    }
}

export const RootProviders = ({ children }) => {
    let currentTime = new Date().getHours()
    const [isDayMode, toggleDayMode, setLightMode, setDarkMode] = useToggle(
        currentTime > 6 && currentTime < 20
    )

    useEffect(() => {
        const timer = setInterval(() => {
            setModeByTime(setLightMode, setDarkMode, isDayMode)
        }, 60000 * 60)
        return () => {
            clearInterval(timer)
        }
    }, [isDayMode, setLightMode, setDarkMode])

    useEffect(() => {
        document.body.dataset.theme = isDayMode ? "light" : "dark"
    }, [isDayMode])

    useEffect(() => {
        setModeByTime(setLightMode, setDarkMode, isDayMode)
    }, [])

    const theme = {
        isDayMode,
        toggleDayMode,
    }

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
