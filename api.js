const funcionarios = document.querySelector('[name="funcionarios"]');
const base = 'http://api.willcode.tech/funcionarios/';

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
                <td>${formataData(pessoa.DataNascimento)}</td>
                <td>R$ ${pessoa.Salario},00</td>
            </tr>`;
    });
};

// Função que remove os títulos da tabela
const removeTitulo = () => {
    const titulo = document.getElementById('titulo');
    titulo.classList.add('d-none');
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

    if(data.ERROR_MESSAGE == 'Nenhum parâmetro necessário para filtrar os dados foi informado.'){
        //pass
        console.log(data.ERROR_MESSAGE);
    } else if(data.ERROR_MESSAGE){
        console.log(data.ERROR_MESSAGE);
        funcionarios.innerHTML = "<h2>Nenhum funcionário encontrado</h2>";
        removeTitulo();
    }else {
        if(document.getElementById('titulo').classList.contains('d-none')){
            document.getElementById('titulo').classList.remove('d-none');
        };
        adicionaTitulosTabela();
        adicionaPessoasTabela(data);
    }
};


