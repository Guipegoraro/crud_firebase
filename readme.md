# CRUD app with Firebase
## TO-DO
find a way to put this on the web without compromising my firebase keys  
add option to change password and delete account  
create "private" and "public" posts (maybe)  
add routing between login, create account, "my posts" and "other users posts"  
the code could be better organized


# instructions:
Construir uma aplicação React que implemente um cadastro de "Tarefas a Fazer", 
usando como referência o aplicativo abordado nesta referência: 
https://learning.oreilly.com/library/view/beginning-react-and/9781484278123/html/512002_1_En_2_Chapter.xhtml

ATENÇÃO: essa implementação proposta é bem ruim em vários 
aspectos e serve apenas para você ter um roteiro e tentar fazer melhor 😉

A solução deve incluir os seguintes requisitos e critérios de correção:

1. Desenvolver componentes em uma interface.
Componente de Login e Criação de Conta (30%).
Componentes com os formulários de entrada de dados (60%).
Modularize o seu código, separando os métodos de acesso ao banco de dados dos componentes de tela (90%).
Procure otimizar o handleChange dos campos. Não crie useState para cada campo (100%).
2. Apresentar dados dinâmicos em uma interface ReactJS
A aplicação deverá implementar Autenticação por Email pelo Firebase (30%).
A abordagem da implementação é totalmente livre, mas com o requisito mínimo dos 4 itens do CRUD:
Incluir e Alterar (60%).
Listar e Excluir (90%).
A lista de registros deverá respeitar o usuário que está logado, exibindo somente os seus registros (100%).