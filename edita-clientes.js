const pegaURL = new URL(window.location)
console.log(pegaURL)

const id = pegaURL.searchParams.get('id')
console.log(id)

const inputCPF = document.querySelector('[data-cpf]')
const inputNome = document.querySelector('[data-nome]')

detalhaCliente(id).then(dados => {
  inputCPF.value = dados[0].cpf
  inputNome.value = dados[0].nome
})

const formEdicao = document.querySelector('[data-form]')

const mensagemSucesso = (mensagem) => {
  const conteudoLinha = `
  <div class="alert-success" role="alert">
    ${mensagem}
  </div>
`
  linha.innerHTML = conteudoLinha
  return linha
}

const mensagemErro = (mensagem) => {
  const conteudoLinha = `
  <div class="alert-warning" role="alert">
    ${mensagem}
  </div>
`
  linha.innerHTML = conteudoLinha
  return linha
}

formEdicao.addEventListener('submit', event => {
  event.preventDefault()

  if(!validaCPF(inputCPF.value)){
    alert("CPF inválido. Por favor, insira um CPF válido.") 
    return
  }

  if(inputCPF.value.length !== 11){
    alert("ESSE CPF NÃO EXISTE")
    return 
}

  editaCliente(id, inputCPF.value, inputNome.value).then(resposta => {
    if(resposta.status == 200) {
      formEdicao.appendChild(mensagemSucesso('Cliente editado com sucesso!'))
    } else {
      formEdicao.appendChild(mensagemErro('Erro na edição do cliente!'))
    }
  })
})