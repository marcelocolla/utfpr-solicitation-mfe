import * as Yup from 'yup'

const required = 'Preenchimento obrigatório'

const FormSolicitationSchema = Yup.object({
  nome_aluno: Yup.string().required(required),
  email_aluno: Yup.string().required(required),
})

export default FormSolicitationSchema
