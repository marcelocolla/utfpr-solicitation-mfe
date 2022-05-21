import React from 'react'
import { Form } from 'formik'
import FormLabel from '@material-ui/core/FormLabel'

import {
  FormBody,
  FormLine,
  InputField,
  Button,
  DisapproveIcon,
  ApproveIcon,
} from '@utfprfabricadesoftware/utfpr-lib-ui-react'
import { WrapperButtons } from './FormSolicitationFields.styles'

type FormSolicitationFieldsProps = {
  isDeseg: boolean
  viewOnly?: boolean
  liberado?: boolean
  handleApproval: (aprovou: boolean) => void
  handleBlurByRa: (event: React.FocusEvent<HTMLInputElement, Element>) => void
}

export const FormSolicitationFields = ({
  liberado,
  isDeseg,
  viewOnly,
  handleBlurByRa,
  handleApproval,
}: FormSolicitationFieldsProps) => {
  return (
    <Form>
      <FormBody>
        <FormLine>
          <InputField name="ra_aluno" label="RA" onBlur={handleBlurByRa} disabled={viewOnly} />
        </FormLine>
        <FormLine mt="8px">
          <InputField name="email_aluno" type="email" label="Email" disabled={viewOnly} />
        </FormLine>
        <FormLine mt="8px">
          <InputField name="nome_aluno" label="Nome" disabled={viewOnly} />
        </FormLine>
        <FormLabel>Data Inicio</FormLabel>
        <FormLine mt="8px">
          <InputField name="data_inicio" type="date" label="" disabled={liberado} />
        </FormLine>
        <FormLabel>Data Fim</FormLabel>
        <FormLine mt="8px">
          <InputField name="data_fim" type="date" label="" disabled={liberado} />
        </FormLine>
        <FormLine mt="8px">
          <InputField name="local" label="Local" disabled={liberado} />
        </FormLine>
      </FormBody>

      <WrapperButtons>
        {!liberado && isDeseg && (
          <Button
            name="desaprovarButton"
            type="button"
            onClickFunction={() => handleApproval(false)}
            title="Reprovar"
          >
            <DisapproveIcon color="white" />
          </Button>
        )}

        {!liberado && <Button name="loginButton">Salvar</Button>}

        {!liberado && isDeseg && (
          <Button
            name="aprovarButton"
            type="button"
            onClickFunction={() => handleApproval(true)}
            title="Aprovar"
          >
            <ApproveIcon color="white" />
          </Button>
        )}
      </WrapperButtons>
    </Form>
  )
}
