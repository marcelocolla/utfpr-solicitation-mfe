import React from 'react'

import { FormSolicitationValues } from 'types/FormSolicitation'
import { getSolicitation } from 'services/solicitation/solicitationService'
import { getStudentByRa } from 'services/student/studentService'

type UseSolicitationParams = {
  id_solicitacao: number
}

interface UseSolicitationState {
  liberado: boolean
  solicitacao: FormSolicitationValues
  loadStudentByRa: (ra: string) => Promise<void>
}

export const useSolicitation = ({
  id_solicitacao,
}: UseSolicitationParams): UseSolicitationState => {
  const [solicitacao, setSolicitacao] = React.useState<FormSolicitationValues>({
    ra_aluno: '',
    nome_aluno: '',
    email_aluno: '',
    data_inicio: '',
    data_fim: '',
    local: '',
    liberado: false,
  })

  const loadSolicitationById = React.useCallback(async () => {
    try {
      const response = await getSolicitation(id_solicitacao)

      if (response.data.cadastroSolicitacao.length !== 0) {
        const solicitacao = response.data.cadastroSolicitacao.rows[0]

        setSolicitacao({
          ra_aluno: solicitacao.Aluno.ra_aluno,
          nome_aluno: solicitacao.Aluno.Pessoa.nome_pessoa,
          email_aluno: solicitacao.Aluno.Pessoa.email,
          data_inicio: solicitacao.data_inicio,
          data_fim: solicitacao.data_fim,
          local: solicitacao.local_visitado,
          liberado: solicitacao.permissao_acesso === 1,
        })
      }
    } catch (err) {
      console.error(`>>> Exception load solicitation id ${id_solicitacao}`)
      console.error(`>>>`, err)
    }
  }, [id_solicitacao])

  const loadStudentByRa = async (ra_aluno: string) => {
    try {
      const response = await getStudentByRa(ra_aluno)

      if (response.data.aluno.length !== 0) {
        setSolicitacao({
          ...solicitacao,
          ra_aluno,
          nome_aluno: response.data.aluno[0].Pessoa.nome_pessoa,
          email_aluno: response.data.aluno[0].Pessoa.email,
        })
      }
    } catch (err) {
      console.error(`>>> Exception load student id ${ra_aluno}`)
      console.error(`>>>`, err)
    }
  }

  React.useEffect(() => {
    if (id_solicitacao !== 0) {
      loadSolicitationById()
    }
  }, [id_solicitacao])

  return {
    liberado: solicitacao.liberado,
    solicitacao,
    loadStudentByRa,
  }
}
