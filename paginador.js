const tamanhoPagina = 10;
let numeroTotalPaginas;
let paginaAtual;

// Função que adiciona paginação para a tabela
function paginador(indexPagina) {
    const linhas = Array.from(funcionarios.getElementsByTagName('tr')).slice(1);
    const textoPaginaAtual = document.getElementById('paginaAtual');
    const indexInicial = indexPagina * tamanhoPagina;
    const indexFinal = indexInicial + tamanhoPagina;
    numeroTotalPaginas = Math.ceil(linhas.length / tamanhoPagina);

    linhas.forEach(function (linha, index) {
        if (index >= indexInicial && index < indexFinal) {
            linha.style.display = 'table-row';
        } else {
            linha.style.display = 'none';
        }
    });

    paginaAtual = indexPagina;
    textoPaginaAtual.textContent = (paginaAtual + 1)
}

// Função para o botão que ao clicado leva o usuário para página anterior
function paginaAnterior() {
    if (paginaAtual > 0) {
        paginador(paginaAtual - 1);
    }
}

// Função para o botão que ao clicado leva o usuário para a próxima página
function proximaPagina() {
    if (paginaAtual < numeroTotalPaginas - 1) {
        paginador(paginaAtual + 1);
    }
}

// Função para o botão que ao clicado leva o usuário para a primeira página
function primeiraPagina() {
    paginaAtual = 0
    paginador(paginaAtual);

}

// Função para o botão que ao clicado leva o usuário para a ultima página
function ultimaPagina() {
    paginaAtual = numeroTotalPaginas - 1
    paginador(paginaAtual);
}

// Botões
const botaoPrimeiraPagina = document.getElementById('botaoPrimeiraPagina');
const botaoPaginaAnterior = document.getElementById('botaoPaginaAnterior');
const botaoProximaPagina = document.getElementById('botaoProximaPagina');
const botaoUltimaPagina = document.getElementById('botaoUltimaPagina');

// Eventos adicionados aos botões
botaoPrimeiraPagina.addEventListener('click', primeiraPagina);
botaoPaginaAnterior.addEventListener('click', paginaAnterior);
botaoProximaPagina.addEventListener('click', proximaPagina);
botaoUltimaPagina.addEventListener('click', ultimaPagina);