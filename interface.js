const funcionarios = document.querySelector('[name="funcionarios"]');
const base = 'http://api.willcode.tech/funcionarios/';

// Função que formata datas
const formatarData = (data => {
    const ano = data.slice(0,4)
    let mes = data.slice(4,6)
    let dia = data.slice(6,8)

    const dataFormatada = dia + "/" + mes + "/" + ano;
    return dataFormatada
});

// Função que adiciona os títulos na tabela
const adicionaTitulosTabela = () => {
    funcionarios.innerHTML =
        `<tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Data de Nascimento</th>
            <th>Salario</th>
        </tr>`
};

// Função que adiciona os os funcionarios na tabela
const adicionaPessoasTabela = (data) => {
    data.forEach(pessoa => {
        funcionarios.innerHTML +=
            `<tr>
                <td>${pessoa.id}</td>
                <td>${pessoa.NomeCompleto}</td>
                <td>${formatarData(pessoa.DataNascimento)}</td>
                <td>R$ ${pessoa.Salario},00</td>
            </tr>`;
    });
};

// Função que remove os títulos da tabela
const removeTitulo = () => {
    const titulo = document.getElementById('titulo');
    titulo.innerHTML = ''
};

// Função que adiciona paginação para a tabela
const paginador = () => {
    const table = document.querySelector('[name="funcionarios"]');
    const rows = Array.from(table.getElementsByTagName('tr')).slice(1);
    const pageSize = 11;
    const pageCount = Math.ceil(rows.length / pageSize);

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const currentPageElement = document.getElementById('currentPage');

    let currentPage = 0;

    function showPage(pageIndex) {
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;

        rows.forEach(function (row, index) {
            if (index >= startIndex && index < endIndex) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });

        currentPage = pageIndex;
        currentPageElement.textContent = currentPage + 1;
    }

    function goToPreviousPage() {
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    }

    function goToNextPage() {
        if (currentPage < pageCount - 1) {
            showPage(currentPage + 1);
        }
    }

    prevButton.addEventListener('click', goToPreviousPage);
    nextButton.addEventListener('click', goToNextPage);

    showPage(0);
};

// Função que lista todos os funcionários em uma tabela
const listaFuncionarios = async () => {
    const query = `?ACAO=LISTAR-TODOS&USUARIO=USUARIO&SENHA=SENHA_SECRETA`;
    const response = await fetch(base + query);
    const data = await response.json();

    if(data.ERROR_MESSAGE){
        console.log(data.ERROR_MESSAGE);
        funcionarios.innerHTML += `<h2>${data.ERROR_MESSAGE}</h2>`;
        removeTitulo();
    } else {
        adicionaTitulosTabela();
        adicionaPessoasTabela(data);
    };
};

// Função que filtra os funcionários na tabela
const filtraFuncionarios = async (filtro) => {
    const query = `?ACAO=LISTAR-FILTROS&${filtro}USUARIO=USUARIO&SENHA=SENHA_SECRETA`;
    const response = await fetch(base + query);
    const data = await response.json();

    if(data.ERROR_MESSAGE){
        console.log(data.ERROR_MESSAGE);
        funcionarios.innerHTML = "<h2>Nenhum funcionário encontrado</h2>";
        removeTitulo();
    } else {
        adicionaTitulosTabela();
        adicionaPessoasTabela(data);
    };

    paginador();
};