import httpClient from 'services/httpClient'

const path = '/aluno'

export function getStudentByRa(ra_aluno: string | number) {
  return httpClient.get(`${path}/${ra_aluno}`)
}
