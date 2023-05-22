const id = document.getElementById("id");
const filtros = document.querySelectorAll(".filter");
const formFiltro = document.querySelector('.form-filter');

// Função que limpa os campos de filtro
const limpaFiltro = (filtros) => {
    filtros.forEach(filtro => {
        if(filtro.children[0].innerText == 'ID'){
            filtro.children[2].value = ''
        } else {
            filtro.children[2].value = ''
            filtro.children[4].value = ''
        }});
    listaFuncionarios().then(() => paginador(0));
};

// Função que formata datas
const formataData = (data) => {
    const ano = data.slice(0,4)
    let mes = data.slice(4,6)
    let dia = data.slice(6,8)

    const dataFormatada = dia + "/" + mes + "/" + ano;
    return dataFormatada
};

// Filtra os funcionários na tabela através do formulário
formFiltro.addEventListener('submit', e => {
    e.preventDefault();
    if(e.submitter.id == 'filtrar'){
        let queryFiltro = '';
        filtros.forEach(filtro => {
            if(filtro.children[0].innerText == 'ID'){
                if(filtro.children[2].value){
                queryFiltro += `FILTRO=${filtro.children[0].id}&VALOR=${filtro.children[2].value}&`;
                };
            } else {
                if(filtro.children[4].value && filtro.children[2].value){
                    queryFiltro += `FILTRO=${filtro.children[4].id}&VALOR=${filtro.children[2].value}&OPERADOR=${filtro.children[4].value}&`;
                };
            };
        });
        filtraFuncionarios(queryFiltro).then(() => paginador(0));
    } else {
        limpaFiltro(filtros);
    };

});

// Lista os funcionários na tabela ao carregar a página
window.addEventListener('load', ()  => {
    listaFuncionarios().then(() => paginador(0));
});