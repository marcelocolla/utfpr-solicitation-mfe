import httpClient from 'services/httpClient'
import { UserState } from 'shared/utfpr-core-shared-mfe/UserStore.types'

export enum StatusEnum {
  PENDENTES = 'pendentes',
  CANCELADAS = 'canceladas',
  APROVADAS = 'aprovadas',
}

const execute = {
  getSolicitacoesByStatus: async (status: string) => {
    const loadSolicitation = async (url: string) => {
      const response = await httpClient.get(`/solicitacao/cadastro/${url}`)

      return response.data.cadastroSolicitacao?.rows || []
    }

    if (status === StatusEnum.PENDENTES) {
      return loadSolicitation('getByPermissao/0')
    }

    if (status === StatusEnum.CANCELADAS) {
      return loadSolicitation('deseg/getSolicitacaoCanceladaDeseg')
    }

    if (status === StatusEnum.APROVADAS) {
      return loadSolicitation('getByPermissao/1')
    }

    return []
  },

  getSolicitacoesByProfessorStatus: async (status: string, userId: string) => {
    const saveSolicitation = async (permissaoAcesso: number) => {
      const response = await httpClient.post('/solicitacao/cadastro/getByIdPessoaCadastro', {
        idPessoaCadastro: userId,
        permissaoAcesso,
      })

      return response.data.cadastroSolicitacao?.rows || []
    }

    if (status === StatusEnum.PENDENTES) {
      return saveSolicitation(0)
    }

    if (status === StatusEnum.CANCELADAS) {
      const response = await httpClient.get(
        `/solicitacao/cadastro/getSolicitacaoCancelada/${userId}`,
      )

      return response.data.cadastroSolicitacao?.rows || []
    }

    if (status === StatusEnum.APROVADAS) {
      return saveSolicitation(1)
    }

    return []
  },
}

export async function executeSolicitationByStatus(user: UserState, status: string) {
  try {
    if (user?.deseg) {
      // Se deseg, retornar tudo
      const solicitacoes = await execute.getSolicitacoesByStatus(status)

      return solicitacoes
    } else {
      const userId = user?.pessoa?.id_pessoa ?? ''

      // Se professor, filtrar quais foram cadastrados pelo professor
      const solicitacoes = await execute.getSolicitacoesByProfessorStatus(status, String(userId))

      return solicitacoes
    }
  } catch (err) {
    console.error(err)
  }
}
