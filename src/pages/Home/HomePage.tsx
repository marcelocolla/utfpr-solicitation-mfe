import React from 'react'
import { Modal, Button, Card } from '@utfprfabricadesoftware/utfpr-lib-ui-react'

import { PageLayout } from 'components/PageLayout'
import { FormSolicitation } from 'components/FormSolicitation'
import { SolicitationRadioGroup } from 'components/SolicitationRadioGroup'

import { WrapperTabs } from './HomePage.styles'

type SolicitacaoProps = {
  id_liberacao: number
  data_inicio: string
  data_fim: string
  Aluno: {
    Pessoa: {
      nome_pessoa: string
    }
  }
}

export const HomePage = (): JSX.Element => {
  const initialState = {
    open: false,
    viewOnly: false,
    selection: 0,
  }

  const [solicitacoes, setSolicitacoes] = React.useState<SolicitacaoProps[]>()
  const [state, setState] = React.useState(initialState)

  const title = state.viewOnly ? 'Solicitação' : 'Nova Solicitação'

  function newSolicitation() {
    setState({
      ...state,
      open: true,
    })
  }

  function exibirCadastro(id: number) {
    setState({
      selection: id,
      viewOnly: true,
      open: true,
    })
  }

  function fecharCadastro() {
    setState({ ...initialState })
  }

  return (
    <PageLayout title="Solicitações">
      <WrapperTabs>
        <SolicitationRadioGroup callbackFunction={setSolicitacoes} />
      </WrapperTabs>

      <div>
        {solicitacoes &&
          solicitacoes.map((item) => (
            <Card
              key={item.id_liberacao}
              name={item.Aluno.Pessoa.nome_pessoa}
              leftInfo={item.data_inicio}
              rightInfo={item.data_fim}
              onEdition={() => exibirCadastro(item.id_liberacao)}
            />
          ))}
      </div>

      <Button type="button" name="criarSolicitacao" onClickFunction={newSolicitation}>
        Criar Solicitação
      </Button>

      <Modal visible={state.open} close={fecharCadastro} title={title}>
        <FormSolicitation viewOnly={state.viewOnly} id_solicitacao={state.selection} />
      </Modal>
    </PageLayout>
  )
}
