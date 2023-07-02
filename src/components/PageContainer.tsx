"use client"

import { View, useTheme } from "@aws-amplify/ui-react"
import { FC, PropsWithChildren } from "react"

const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  return (
    <View
      padding={theme.tokens.space.medium}
      maxWidth={theme.breakpoints.values.large}>
      {children}
    </View>
  )
}

export default PageContainer
