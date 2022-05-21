import React from 'react'
import { Route, RouteProps, Redirect, Switch } from 'react-router-dom'
import useUserStore from 'shared/utfpr-core-shared-mfe/UserStore'

import { getRoutesMap } from './RoutesMap'

type RoutesAppProps = {
  basename?: string
}

const RoutesApp = ({ basename = '' }: RoutesAppProps): JSX.Element => {
  const findRoutes = React.useCallback(() => getRoutesMap(basename), [basename])

  const routes = findRoutes()
  const user = useUserStore?.()

  if (!user.token) {
    return <Redirect to={user?.redirectAuth || '/login'} />
  }

  return (
    <React.Suspense fallback="Carregando...">
      <Switch>
        {routes.map((route: RouteProps) => (
          <Route key={route.path?.toString()} {...route} />
        ))}
      </Switch>
    </React.Suspense>
  )
}

export default RoutesApp
