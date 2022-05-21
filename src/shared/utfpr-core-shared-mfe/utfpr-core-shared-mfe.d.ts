/// <reference types="react" />

import { UserStoreType } from './UserStore.types'

declare module 'utfpr-core-shared-mfe/UserStore' {
  const UserStore: UserStoreType

  export default UserStore
}
