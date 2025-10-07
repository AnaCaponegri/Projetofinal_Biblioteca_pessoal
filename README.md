📚 Biblioteca Pessoal

## Descrição
O projeto Biblioteca Pessoal é uma aplicação de terminal desenvolvida em Node.js com o objetivo de ajudar o usuário a gerenciar seus livros de forma simples e prática.
Com ela, é possível cadastrar novos livros, acompanhar o progresso de leitura, marcar livros como lidos, avaliar, consultar estatísticas e até apagar registros individuais ou resetar toda a biblioteca.
Os dados são salvos localmente em um arquivo dados.json, o que garante que as informações fiquem armazenadas mesmo após o fechamento do programa.

⚙️ Funcionalidades
- Cadastrar novos livros informando título, autor, gênero e número de páginas.
- Listar todos os livros cadastrados.
- Atualizar o progresso de leitura ou marcar o livro como lido.
- Avaliar o livro após a conclusão da leitura.
- Exibir estatísticas como quantidade de livros lidos, em leitura, desejados e o gênero mais lido.
- Apagar livros individualmente.
- Resetar toda a biblioteca, apagando todos os dados salvos.

🚀 Como Executar
Clonar o repositório do projeto.
Acessar a pasta do projeto pelo terminal.
Instalar as dependências com o comando npm install.
Rodar o aplicativo com o comando node index.js.
Após isso, o menu principal aparecerá no terminal, permitindo navegar entre as opções.

💻 Tecnologias Utilizadas
- O projeto foi desenvolvido em Node.js, utilizando:
- @inquirer/prompts para criar os menus interativos no terminal.
- chalk para deixar as mensagens coloridas e mais legíveis.
- fs (File System) para salvar e carregar os dados no arquivo dados.json.

.

🗂️ Estrutura de Dados
Os livros são armazenados em um arquivo dados.json no formato de uma lista de objetos.
Cada livro possui os seguintes atributos:

id: identificador numérico único.
titulo, autor, genero, paginas: informações básicas do livro.
status: pode ser “quero_ler”, “lendo” ou “lido”.
paginaAtual: indica o progresso da leitura.
avaliacao: nota de 1 a 5, dada ao final da leitura.
dataInicio e dataFim: registram o período da leitura.

📸 Visual do Aplicativo
<img width="310" height="181" alt="image" src="https://github.com/user-attachments/assets/9032ad63-aa2b-4e6c-ac1d-e7c8fc7674e2" />



👩‍💻 Autor
O projeto foi desenvolvido por Ana Caponegri, estudante e desenvolvedora em formação, com foco em front-end e aprimoramento em JavaScript.
Contato: ana_caponegri@estudante.sc.senai.br

🎓 Aprendizados
Durante o desenvolvimento, foram aprendidos conceitos importantes como:
Manipulação de arquivos JSON com o módulo fs.
Criação de menus interativos e lógicos com @inquirer/prompts.
Uso de async/await em aplicações Node.js.
Organização de código em funções bem definidas.
Pensamento voltado à experiência do usuário mesmo em um ambiente de terminal.
