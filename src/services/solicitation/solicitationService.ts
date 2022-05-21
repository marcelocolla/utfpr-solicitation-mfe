import httpClient from 'services/httpClient'

import { dataAgora, horaAgora } from 'helpers/dateFormat'
import { UserState } from 'shared/utfpr-core-shared-mfe/UserStore.types'
import { FormSolicitationValues } from 'types/FormSolicitation'

const path = '/solicitacao/cadastro'

type CreateSolicitationParams = {
  values: FormSolicitationValues
  user: UserState
}

type UpdateSolicitationParams = {
  values: FormSolicitationValues
  id_solicitacao: string | number
}

type UpdateLiberationParams = {
  aprovou: boolean
  id_solicitacao: string | number
  id_pessoa: number | null
}

export function getSolicitation(id_solicitacao: string | number) {
  return httpClient.get(`${path}/${id_solicitacao}`)
}

export function updateSolicitation({ values, id_solicitacao }: UpdateSolicitationParams) {
  const payload = {
    id_liberacao: id_solicitacao,
    data_inicio: values.data_inicio,
    data_fim: values.data_fim,
    local_visitado: values.local,
  }

  return httpClient.put(path, payload)
}

export function createSolicitation({ values, user }: CreateSolicitationParams) {
  const payload = {
    data_inicio: values.data_inicio,
    data_fim: values.data_fim,
    permissao_acesso: user?.deseg ? 1 : 0,
    data_permissao: user?.deseg ? dataAgora() : null,
    hora_permissao: user?.deseg ? horaAgora() : null,
    id_pessoa_cadastro: user?.pessoa?.id_pessoa,
    id_pessoa_permitiu: user?.deseg ? user?.pessoa?.id_pessoa : null,

    ra_aluno: values.ra_aluno,
    nome_aluno: values.nome_aluno,
    email: values.email_aluno,
    tipo_usuario: user?.pessoa?.tipo_usuario,
    codigo_barra: null,

    origem_envio: 0,
    local_visitado: values.local,
  }

  return httpClient.post(path, payload)
}

export function updateLiberation({ id_solicitacao, id_pessoa, aprovou }: UpdateLiberationParams) {
  const payload = {
    id_liberacao: id_solicitacao,
    id_pessoa_permitiu: id_pessoa,
    permissao_acesso: aprovou ? 1 : 0,
    data_permissao: dataAgora(),
    hora_permissao: horaAgora(),
  }

  return httpClient.put('solicitacao/cadastro', payload)
}
