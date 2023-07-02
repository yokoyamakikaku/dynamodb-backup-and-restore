'use client'

import { View, Heading, useTheme } from "@aws-amplify/ui-react"

const AuthenticatorHeader = () => {
  const theme = useTheme()
  return (
    <View padding={theme.tokens.space.large}>
      <Heading level={4} textAlign="center">
        Cognito の切り離し検証
      </Heading>
    </View>
  )
}

export default AuthenticatorHeader
