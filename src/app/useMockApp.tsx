import React from 'react'

import useUserStore from 'shared/utfpr-core-shared-mfe/UserStore'

export const useMockApp = () => {
  const user = useUserStore()

  const isDevelopment = process.env.NODE_ENV === 'development'

  React.useEffect(() => {
    if (isDevelopment) {
      // Mock user
      user.updateUser({
        redirectAuth: '/login',
        token: 'mock-token',
        pessoa: {
          id_pessoa: 1,
          tipo_usuario: 1,
          nome_pessoa: 'John Doe',
          email: 'john.doe@gmail.com',
          codigo_barra: '12345',
        },
        vigilante: {
          id_deseg: 27,
          id_pessoa: 285,
          matricula: '02940924',
        },
      })
    }
  }, [])
}
