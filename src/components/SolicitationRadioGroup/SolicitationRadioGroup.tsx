import React, { useState, useEffect } from 'react'
import { ToggleButtonGroup } from '@material-ui/lab'

import httpClient from 'services/httpClient'
import useUserStore from 'shared/utfpr-core-shared-mfe/UserStore'

import { ToggleStyled } from './SolicitationRadioGroup.styles'

const PENDENTES = 'pendentes'
const CANCELADAS = 'canceladas'
const APROVADAS = 'aprovadas'

const getSolicitacoesByStatus = async (status: string) => {
  const loadSolicitation = async (url: string) => {
    const response = await httpClient.get(`/solicitacao/cadastro/${url}`)

    return response.data.cadastroSolicitacao.rows
  }

  if (status === PENDENTES) {
    return loadSolicitation('getByPermissao/0')
  }

  if (status === CANCELADAS) {
    return loadSolicitation('deseg/getSolicitacaoCanceladaDeseg')
  }

  if (status === APROVADAS) {
    return loadSolicitation('getByPermissao/1')
  }

  return []
}

const getSolicitacoesByProfessorStatus = async (status: string, userId: string) => {
  const saveSolicitation = async (permissaoAcesso: number) => {
    const response = await httpClient.post('/solicitacao/cadastro/getByIdPessoaCadastro', {
      idPessoaCadastro: userId,
      permissaoAcesso,
    })

    return response.data.cadastroSolicitacao.rows
  }

  if (status === PENDENTES) {
    return saveSolicitation(0)
  }

  if (status === CANCELADAS) {
    const response = await httpClient.get(`/solicitacao/cadastro/getSolicitacaoCancelada/${userId}`)

    return response.data.cadastroSolicitacao.rows
  }

  if (status === APROVADAS) {
    return saveSolicitation(1)
  }

  return []
}

type FormProps = {
  callbackFunction: (collection: Array<any>) => void
}

export function SolicitationRadioGroup(props: FormProps) {
  const user = useUserStore?.()

  const [selection, setSelection] = useState('pendentes')

  const handleSelection = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setSelection(newSelection)
      setStatus(newSelection)
    }
  }

  const setStatus = async (status: string) => {
    try {
      if (user?.deseg) {
        // Se deseg, retornar tudo
        const solicitacoes = await getSolicitacoesByStatus(status)

        props.callbackFunction(solicitacoes)
      } else {
        const userId = user?.pessoa?.id_pessoa ?? ''

        // Se professor, filtrar quais foram cadastrados pelo professor
        const solicitacoes = await getSolicitacoesByProfessorStatus(status, String(userId))

        props.callbackFunction(solicitacoes)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setStatus(selection)
  }, [selection])

  return (
    <ToggleButtonGroup value={selection} exclusive onChange={handleSelection}>
      <ToggleStyled value={PENDENTES}>
        <span>Pendentes</span>
      </ToggleStyled>
      <ToggleStyled value={CANCELADAS}>
        <span>Canceladas</span>
      </ToggleStyled>
      <ToggleStyled value={APROVADAS}>
        <span>Aprovadas</span>
      </ToggleStyled>
    </ToggleButtonGroup>
  )
}
