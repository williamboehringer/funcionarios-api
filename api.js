const id = document.getElementById("id");
const filtros = document.querySelectorAll(".filter");
const formFiltro = document.querySelector('.form-filter');

// Filtra os funcionários na tabela através do formulário
formFiltro.addEventListener('submit', e => {
    e.preventDefault();
    let queryFiltro = '';
    filtros.forEach(filtro => {

        if(filtro.children[0].innerText == 'ID'){
            if(filtro.children[2].value){
            queryFiltro += `FILTRO=${filtro.children[0].id}&VALOR=${filtro.children[2].value}&`;
            filtro.children[2].value = ''
            };
        } else {
            if(filtro.children[4].value && filtro.children[2].value){
                queryFiltro += `FILTRO=${filtro.children[4].id}&VALOR=${filtro.children[2].value}&OPERADOR=${filtro.children[4].value}&`;
            };
            filtro.children[2].value = '';
            filtro.children[4].value = '';
        };
    });

    filtraFuncionarios(queryFiltro);
});

// Lista os funcionários na tabela ao carregar a página
window.addEventListener('load', () => {
    listaFuncionarios().then(() => paginador());
});