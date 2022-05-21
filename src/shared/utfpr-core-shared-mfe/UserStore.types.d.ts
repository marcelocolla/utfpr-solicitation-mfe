export interface Person {
  id_pessoa: number
  tipo_usuario: number
  nome_pessoa: string
  email: string
  codigo_barra: string
}

export interface UserGeneric {
  id_pessoa: number
  matricula: string
  id_deseg?: number
  id_departamento?: number
}

export interface UserState {
  token: string
  redirectAuth: string
  pessoa?: Person
  deseg?: UserGeneric
  professor?: UserGeneric
  vigilante?: UserGeneric
}

export interface UserStoreResponse extends UserState {
  getRegistrationNumber: () => string
  updateUser: (data: UserState, redirectAuth?: string) => void
  resetUser: () => void
}

export type UserStoreType = () => UserStoreResponse
