import React, { useEffect } from 'react'
import { ToggleButtonGroup } from '@material-ui/lab'

import useUserStore from 'shared/utfpr-core-shared-mfe/UserStore'
import {
  executeSolicitationByStatus,
  StatusEnum,
} from 'services/solicitation/solicitationByStatusService'

import { ToggleStyled } from './SolicitationRadioGroup.styles'

type FormProps = {
  status: string
  setStatus(state: string): void
  callbackFunction: (collection: Array<any>) => void
}

export function SolicitationRadioGroup({ status, setStatus, callbackFunction }: FormProps) {
  const user = useUserStore?.()

  const findSolicitationByStatus = async () => {
    const result = await executeSolicitationByStatus(user, status)

    callbackFunction(result)
  }

  const handleSelection = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setStatus(newSelection)
    }
  }

  useEffect(() => {
    findSolicitationByStatus()
  }, [status])

  return (
    <ToggleButtonGroup value={status} exclusive onChange={handleSelection}>
      <ToggleStyled value={StatusEnum.PENDENTES}>
        <span>Pendentes</span>
      </ToggleStyled>
      <ToggleStyled value={StatusEnum.CANCELADAS}>
        <span>Canceladas</span>
      </ToggleStyled>
      <ToggleStyled value={StatusEnum.APROVADAS}>
        <span>Aprovadas</span>
      </ToggleStyled>
    </ToggleButtonGroup>
  )
}
