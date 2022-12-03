import React from 'react'
import { Modal, Button, Card } from '@utfprfabricadesoftware/utfpr-lib-ui-react'
import { Typography } from '@material-ui/core'

import useUserStore from 'shared/utfpr-core-shared-mfe/UserStore'
import { PageLayout } from 'components/PageLayout'
import { FormSolicitation } from 'components/FormSolicitation'
import { SolicitationRadioGroup } from 'components/SolicitationRadioGroup'

import { WrapperTabs } from './HomePage.styles'
import { executeSolicitationByStatus } from 'services/solicitation/solicitationByStatusService'

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

const initialState = {
  open: false,
  viewOnly: false,
  selection: 0,
}

export const HomePage = (): JSX.Element => {
  const user = useUserStore?.()

  const [solicitacoes, setSolicitacoes] = React.useState<SolicitacaoProps[]>()
  const [state, setState] = React.useState(initialState)
  const [status, setStatus] = useState('pendentes')

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

  async function onRefreshList() {
    const result = await executeSolicitationByStatus(user, status)

    setSolicitacoes(result)
  }

  return (
    <PageLayout title="Solicitações">
      <WrapperTabs>
        <SolicitationRadioGroup
          status={status}
          setStatus={setStatus}
          callbackFunction={setSolicitacoes}
        />
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

        {Array.isArray(solicitacoes) && solicitacoes.length === 0 && (
          <Typography variant="subtitle1" gutterBottom>
            Nenhum registro encontrado!
          </Typography>
        )}
      </div>

      <Button type="button" name="criarSolicitacao" onClickFunction={newSolicitation}>
        Criar Solicitação
      </Button>

      <Modal visible={state.open} close={fecharCadastro} title={title}>
        <FormSolicitation
          viewOnly={state.viewOnly}
          id_solicitacao={state.selection}
          onRefreshList={onRefreshList}
        />
      </Modal>
    </PageLayout>
  )
}
