import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'

import useUserStore from 'shared/utfpr-core-shared-mfe/UserStore'
import { FormSolicitationValues } from 'types/FormSolicitation'
import { useSolicitation } from 'hooks/solicitation'

import {
  createSolicitation,
  updateLiberation,
  updateSolicitation,
} from 'services/solicitation/solicitationService'

import { FormSolicitationFields } from 'components/FormSolicitationFields'
import FormSolicitationSchema from './FormSolicitation.schema'

type SolicitacaoProps = {
  viewOnly?: boolean
  id_solicitacao: number
}

export const FormSolicitation = ({ id_solicitacao, viewOnly }: SolicitacaoProps) => {
  const history = useHistory()
  const user = useUserStore?.()
  const { liberado, solicitacao, loadStudentByRa } = useSolicitation({ id_solicitacao })

  const handleUpdate = async (values: FormSolicitationValues) => {
    try {
      const response = await updateSolicitation({ values, id_solicitacao })

      if (response.status !== 200) {
        alert('Houve um problema ao salvar, contate o suporte!')
      } else {
        history.go(0)
      }
    } catch (err) {
      console.error('>>> Exception solicitation update')
      console.error('>>>', err)

      alert('Falha ao atualizar os dados, tente novamente!')
    }
  }

  const handleSubmit = async (values: FormSolicitationValues) => {
    try {
      const response = await createSolicitation({ values, user })

      if (response.status !== 200) {
        alert('Houve um problema ao cadastrar, contate o suporte!')
      } else {
        history.go(0)
      }
    } catch (err) {
      console.error('>>> Exception solicitation create')
      console.error('>>>', err)

      alert('Falha ao gravar os dados, tente novamente!')
    }
  }

  const handleLiberacao = async (aprovou: boolean) => {
    try {
      const response = await updateLiberation({
        aprovou,
        id_solicitacao,
        id_pessoa: (user?.deseg && user?.pessoa?.id_pessoa) || null,
      })

      if (response.status !== 200) {
        alert('Houve um problema ao aprovar, contate o suporte!')
      } else {
        history.go(0)
      }
    } catch (err) {
      console.error('>>> Exception liberation update')
      console.error('>>>', err)

      alert('Falha ao aprovar liberação, tente novamente!')
    }
  }

  const handleBlurByRa = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = event.target
    const ra = value?.replace(/[^0-9]/g, '')

    if (ra?.length < 6) {
      alert('Informe um RA válido')
    } else {
      loadStudentByRa(ra)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={solicitacao}
      validationSchema={FormSolicitationSchema}
      onSubmit={viewOnly ? handleUpdate : handleSubmit}
      component={(props) => (
        <FormSolicitationFields
          {...props}
          isDeseg={Boolean(user?.deseg)}
          viewOnly={viewOnly}
          liberado={liberado}
          handleApproval={handleLiberacao}
          handleBlurByRa={handleBlurByRa}
        />
      )}
    />
  )
}
