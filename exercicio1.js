//1. Pegar os valores
//2. Calcular a Idade (Com base no ano, Com mês (EXTRA) e Com dia (EXTRA)
//3. Gerar a faixa etária
//4. Organizar o objeto pessoa para salvar na lista
//5. Cadastrar a pessoa na lista
//6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
//7. Renderizar o conteúdo da tabela com as pessoas cadastradas
//8. Botão para limpar os registros;
   /*
   Resultado               Situacao
   Entre 0 a 12            Criança
   Entre 13 a 17          Adolescente
   Entre 18 a 65           Adulto  
   Acima de 65             Idoso 
    */

function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = pegarValores()

    // Passo 2
    let idadeCalculada = receberAno(usuario.ano)

    // Passo 3
    let usuarioIdade = faixadeIdade(idadeCalculada)

    console.log (usuarioIdade)

    // Passo 4
    usuario = organizarDados (usuario, idadeCalculada, usuarioIdade)

    // Passo 5
    cadastrarUsuario (usuario)

    window.location.reload()

}
// Passo 1
function pegarValores() {

    let nomeRecebido = document.getElementById ("nome").value.trim()
    let diaRecebido = document.getElementById ("dia-nascimento").value
    let mesRecebido = document.getElementById ("mes-nascimento").value
    let anoRecebido = document.getElementById ("ano-nascimento").value

    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaRecebido,
        mes: mesRecebido,
        ano: anoRecebido


    }
    console.log(dadosUsuario)
    return dadosUsuario
}
// Passo 2
function receberAno (ano) {
    let dataAtual = new Date();
    let anoAtual  = dataAtual.getFullYear();

    let idade = anoAtual - ano

    console.log(idade)

    return idade
}

//passo 3

function faixadeIdade (idade) {

    if (idade <=12) {
    return "crianca"

    } else if (idade >=13 && idade <=17) {
    return"Adolescentes"

    } else if (idade >= 18 && idade <=65)  {
    return"Adulto"

    } else {
    return"Idoso"

    }

}

  //passo 4
    function organizarDados(dadosUsuario, usuarioIdade, idade) {
        let buscarDados ={
            ...dadosUsuario, 
            fonteidade: idade, 
            alerta: usuarioIdade

        }
        
        return buscarDados
    }
    // Passo 5
    function cadastrarUsuario(dadosUsuario) {
        let listaUsuarios = []
    
        //Se houver uma lista de usuarios no localStroge, carrega isso para a variavel listUsuarios
        if (localStorage.getItem("usuariosCadastrados") != null) {
            listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") ) 
    
        }
            //Adicionar o usuario na lista de usuarios
             listaUsuarios.push(dadosUsuario)
            
             // Salva a listaUsuarios nolocalStorange
             localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
        
             
    }
    // Passo 6
    function carregarUsuarios() {
        let listaCarregada = []
    
        if ( localStorage.getItem("usuariosCadastrados")) {
            listaCarregada = JSON.parse( localStorage.getItem("usuariosCadastrados") ) 
            
        }
    
        if (listaCarregada.length == 0) {
            //Se náo tiver nenhum usuario cadastrado, mostrar mensagem
            let tabela = document.getElementById("corpo-tabela")
    
            tabela.innerHTML = `<tr class="linha-mensagem">
                <td colspan="6">Nenhum usuario cadastrado :( </td>
    
            </tr>`
    
        } else {
            //Montar conteudo da tabela
            montarTabela(listaCarregada)
        }
    
        console.log(listaCarregada)
        }
        window.addEventListener("DOMContentLoaded",() => carregarUsuarios())
    
        //Passo 7
        function  montarTabela(listaUsuarios) {
            let tabela = document.getElementById("corpo-tabela")
    
            let template = ""
    
            listaUsuarios.forEach(usuario => {
                template += `
                <tr>
                <td data-cell="nome">${usuario.nome}</td>
                <td data-cell="data de nascimento">${usuario.nome + '/' + usuario.dia + '/' + usuario.ano}</td>
                <td data-cell="idade">${usuario.fonteidade}</td>
                <td data-cell="faixa etária">${usuario.alerta}</td>
            </tr> `                   
            })
    
            tabela.innerHTML = template;
        }
        
     // Passo 8   
    function deletarRegistros() {
        // Remove o item do localStorage
        localStorage.removeItem("usuariosCadastrados")
    
        // Recarrega a página
        window.location.reload()
    }

