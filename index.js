import * as inquirer from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs";

// Caminho do arquivo de dados
const caminhoDados = "./dados.json";

// Funções utilitárias
function carregarLivros() {
  if (!fs.existsSync(caminhoDados)) return [];
  const data = fs.readFileSync(caminhoDados, "utf-8");
  return data ? JSON.parse(data) : [];
}

function salvarLivros(livros) {
  fs.writeFileSync(caminhoDados, JSON.stringify(livros, null, 2));
}

// Menu principal
async function menuPrincipal() {
  console.clear();
  console.log(chalk.cyanBright("📚 BIBLIOTECA PESSOAL"));
  console.log(chalk.gray("------------------------------------"));

  const opcao = await inquirer.select({
    message: "O que deseja fazer?",
    choices: [
      { name: "Cadastrar livro", value: "cadastrar" },
      { name: "Ver lista de livros", value: "listar" },
      { name: "Marcar como lido / atualizar progresso", value: "atualizar" },
      { name: "Ver estatísticas", value: "estatisticas" },
      { name: "Apagar livro", value: "apagar" },
      { name: "Apagar todos os livros (resetar)", value: "resetar" },
      { name: "Sair", value: "sair" },
    ],
  });

  switch (opcao) {
    case "cadastrar":
      await cadastrarLivro();
      break;
    case "listar":
      listarLivros();
      break;
    case "atualizar":
      await atualizarLivro();
      break;
    case "estatisticas":
      mostrarEstatisticas();
      break;
    case "apagar":
      await apagarLivro();
      break;
    case "resetar":
      await resetarBiblioteca();
      break;
    case "sair":
      console.log(chalk.green("Até a próxima! 👋"));
      process.exit(0);
  }

  await voltarMenu();
}

// Cadastrar novo livro
async function cadastrarLivro() {
  const titulo = await inquirer.input({ message: "Título do livro:" });
  const autor = await inquirer.input({ message: "Autor:" });
  const paginas = parseInt(await inquirer.input({ message: "Número de páginas:" }));
  const genero = await inquirer.input({ message: "Gênero:" });

  const livros = carregarLivros();
  const novoLivro = {
    id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
    titulo,
    autor,
    paginas,
    genero,
    status: "quero_ler",
    paginaAtual: 0,
    avaliacao: null,
    dataInicio: null,
    dataFim: null,
  };

  livros.push(novoLivro);
  salvarLivros(livros);

  console.log(chalk.green("\n📘 Livro cadastrado com sucesso!\n"));
}

// Listar livros
function listarLivros() {
  const livros = carregarLivros();
  if (livros.length === 0) {
    console.log(chalk.yellow("Nenhum livro cadastrado ainda."));
    return;
  }

  livros.forEach((livro) => {
    console.log(
      chalk.cyanBright(`${livro.id}. ${livro.titulo}`),
      chalk.gray(`(${livro.genero}) - ${livro.status}`)
    );
  });
}

// Atualizar progresso ou marcar como lido
async function atualizarLivro() {
  const livros = carregarLivros();
  if (livros.length === 0) {
    console.log(chalk.yellow("Nenhum livro cadastrado."));
    return;
  }

  const escolha = await inquirer.select({
    message: "Escolha o livro:",
    choices: livros.map((l) => ({ name: l.titulo, value: l.id })),
  });

  const livro = livros.find((l) => l.id === escolha);

  const acao = await inquirer.select({
    message: "O que deseja fazer?",
    choices: [
      { name: "Atualizar página atual", value: "progresso" },
      { name: "Marcar como lido e avaliar", value: "avaliar" },
    ],
  });

  if (acao === "progresso") {
    const paginaAtual = parseInt(
      await inquirer.input({ message: "Digite a página atual:" })
    );
    livro.paginaAtual = paginaAtual;
    livro.status = "lendo";
    if (!livro.dataInicio) livro.dataInicio = new Date().toISOString().split("T")[0];
  } else {
    livro.status = "lido";
    livro.paginaAtual = livro.paginas;
    livro.dataFim = new Date().toISOString().split("T")[0];
    livro.avaliacao = parseInt(await inquirer.input({ message: "Avaliação (1-5):" }));
  }

  salvarLivros(livros);
  console.log(chalk.green("\n📖 Livro atualizado com sucesso!\n"));
}

// Apagar livro individualmente
async function apagarLivro() {
  const livros = carregarLivros();
  if (livros.length === 0) {
    console.log(chalk.yellow("Nenhum livro cadastrado."));
    return;
  }

  const escolha = await inquirer.select({
    message: "Escolha o livro que deseja apagar:",
    choices: livros.map((l) => ({ name: `${l.titulo} (${l.autor})`, value: l.id })),
  });

  const confirmar = await inquirer.confirm({
    message: "Tem certeza que deseja apagar este livro?",
  });

  if (confirmar) {
    const novosLivros = livros.filter((l) => l.id !== escolha);
    salvarLivros(novosLivros);
    console.log(chalk.red("\n🗑️ Livro removido com sucesso!\n"));
  } else {
    console.log(chalk.gray("\nAção cancelada.\n"));
  }
}

// Resetar biblioteca (apagar todos os livros)
async function resetarBiblioteca() {
  const confirmar = await inquirer.confirm({
    message: chalk.red("Tem certeza que deseja apagar TODOS os livros? Esta ação não pode ser desfeita."),
  });

  if (confirmar) {
    salvarLivros([]);
    console.log(chalk.redBright("\n⚠️ Todos os livros foram apagados!\n"));
  } else {
    console.log(chalk.gray("\nAção cancelada.\n"));
  }
}

// Estatísticas
function mostrarEstatisticas() {
  const livros = carregarLivros();
  if (livros.length === 0) {
    console.log(chalk.yellow("Nenhum dado disponível."));
    return;
  }

  const lidos = livros.filter((l) => l.status === "lido").length;
  const lendo = livros.filter((l) => l.status === "lendo").length;
  const queroLer = livros.filter((l) => l.status === "quero_ler").length;

  console.log(chalk.magentaBright("\n📊 ESTATÍSTICAS:"));
  console.log(chalk.green(`• Lidos: ${lidos}`));
  console.log(chalk.yellow(`• Lendo: ${lendo}`));
  console.log(chalk.cyan(`• Quero ler: ${queroLer}`));

  // Gênero favorito
  const generos = {};
  livros.forEach((l) => {
    if (l.genero && l.status === "lido") {
      generos[l.genero] = (generos[l.genero] || 0) + 1;
    }
  });

  const topGenero = Object.entries(generos).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (topGenero) {
    console.log(chalk.blueBright(`\n💡 Gênero favorito: ${topGenero}`));
  }
}

// Voltar ao menu
async function voltarMenu() {
  await inquirer.input({ message: chalk.gray("Pressione ENTER para voltar ao menu...") });
  await menuPrincipal();
}

// Inicialização
menuPrincipal();
