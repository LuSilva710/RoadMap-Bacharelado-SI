// ============================================================================
// DADOS OFICIAIS — Bacharelado em Sistemas de Informação (BSI)
// IFMG - Campus Ouro Branco
// Fonte: Ementário BSI (nov/2019) + PPC 2017. Pré-requisitos são sugestões.
// ============================================================================

import fullstackImg from "./assets/sprites/fullstack.jpg";
import dataImg from "./assets/sprites/data.jpg";
import infraImg from "./assets/sprites/infra.jpg";
import segImg from "./assets/sprites/seguranca.jpg";
import uxuiImg from "./assets/sprites/uxui.jpg";
import qaImg from "./assets/sprites/qa.jpg";
import gameImg from "./assets/sprites/game.jpg";
import projectImg from "./assets/sprites/project.jpg";
import consultantImg from "./assets/sprites/consultant.jpg";
import founderImg from "./assets/sprites/founder.jpg";
import { AvatarSpec } from "./components/PixelAvatar";

export const META = {
  curso: "Bacharelado em Sistemas de Informação (BSI)",
  instituicao: "IFMG - Campus Ouro Branco",
  cargaHorariaTotalMinima: 3004,
  cargaObrigatoriasListadas: 2208,
  turno: "Noturno",
  duracao: "4 anos (8 períodos)",
  vagas: "50 por ano",
  fonte: "https://www.ifmg.edu.br/ourobranco/nossos-cursos/graduacao-6/Ementario_BSI_2020.pdf",
  fonteCurso: "https://www.ifmg.edu.br/ourobranco/nossos-cursos/graduacao-6/sistemas-de-informacao",
};

export type AreaId = "dev" | "eng_sw" | "infra" | "dados" | "gestao" | "fundamentos";

export interface Area {
  id: AreaId;
  nome: string;
  descricao: string;
  cor: string;
  abbr: string;
  icon: string;
}

export const AREAS: Area[] = [
  { id: "dev", nome: "Desenvolvimento de Software & Algoritmos", abbr: "DEV", cor: "#48a848", icon: "⚔", descricao: "Lógica de programação, estruturas de dados, orientação a objetos, web e mobile." },
  { id: "eng_sw", nome: "Engenharia de Software & Qualidade", abbr: "ENG", cor: "#a070e0", icon: "✦", descricao: "Como planejar, projetar, testar e garantir a qualidade de sistemas, incluindo usabilidade (IHC)." },
  { id: "infra", nome: "Infraestrutura, Redes & Sistemas Operacionais", abbr: "INF", cor: "#f85858", icon: "🛡", descricao: "Como o computador funciona por dentro, sistemas operacionais, redes e sistemas distribuídos." },
  { id: "dados", nome: "Dados & Inteligência de Negócios", abbr: "DAD", cor: "#58a0e8", icon: "◆", descricao: "Bancos de dados, apoio à decisão e inteligência artificial." },
  { id: "gestao", nome: "Gestão, Governança & Negócios", abbr: "GES", cor: "#d8a830", icon: "♛", descricao: "Administração, contabilidade, governança de TI, projetos e empreendedorismo." },
  { id: "fundamentos", nome: "Fundamentos, Matemática & Formação Geral", abbr: "FUN", cor: "#b09060", icon: "✚", descricao: "Matemática, estatística, ética, comunicação e método científico." },
];

export const AREA_BY_ID = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<AreaId, Area>;

export type Tipo = "obrigatoria" | "optativa_especifica";

export interface Disciplina {
  id: string;
  nome: string;
  ch: number;
  chT: number;
  chP: number;
  area: AreaId;
  codigo: string;
  tipo: Tipo;
  pre: string[];
  ementa: string;
  periodo: number; // 0 = optativa
  carreiras: string[];
}

type Row = [string, string, number, number, number, AreaId, string, Tipo, string, string, string, string];

const rows: Row[] = [
  // ---- 1º período
  ["ip", "Introdução à Programação", 64, 32, 32, "dev", "OBBGSIN.085", "obrigatoria", "", "1", "Seu primeiro contato com programação: algoritmos, variáveis, condições, laços e funções.", "fullstack,data_scientist,devops_infra,ai_engineer"],
  ["etica", "Ética e Legislação", 32, 32, 0, "fundamentos", "OBBGSIN.044", "obrigatoria", "", "1", "Ética profissional, LGPD, Marco Civil da Internet, direitos autorais e crimes digitais.", "seguranca,it_consultant"],
  ["adm1", "Princípios da Administração I", 64, 64, 0, "gestao", "OBBGSIN.011", "obrigatoria", "", "1", "Como as empresas se organizam, planejam e são lideradas, e o papel da tecnologia nos negócios.", "project_manager,it_consultant,empreendedor"],
  ["isi", "Introdução a Sistemas de Informação", 64, 32, 32, "gestao", "OBBGSIN.001", "obrigatoria", "", "1", "Visão geral da computação: hardware, software, sistemas de numeração, lógica, redes e sistemas de informação.", "project_manager,it_consultant,empreendedor"],
  ["port", "Português Instrumental I", 32, 32, 0, "fundamentos", "OBBGSIN.007", "obrigatoria", "", "1", "Leitura e escrita de textos técnicos e acadêmicos.", "ux_ui,project_manager"],
  ["pcalc", "Pré-Cálculo", 64, 64, 0, "fundamentos", "OBBGSIN.101", "obrigatoria", "", "1", "Funções e gráficos: a preparação para o Cálculo.", "data_scientist,ai_engineer"],
  // ---- 2º período
  ["aed1", "Algoritmos e Estrutura de Dados I", 64, 30, 34, "dev", "OBBGSIN.009", "obrigatoria", "ip", "2", "Listas, pilhas, filas, busca e ordenação para criar programas eficientes.", "fullstack,data_scientist,ai_engineer"],
  ["calc", "Cálculo Diferencial e Integral", 64, 64, 0, "fundamentos", "OBBGSIN.012", "obrigatoria", "pcalc", "2", "Limites, derivadas e integrais.", "data_scientist,ai_engineer"],
  ["ing1", "Inglês Instrumental I", 32, 32, 0, "fundamentos", "OBBGSIN.003", "obrigatoria", "", "2", "Leitura de textos técnicos em inglês.", "fullstack,devops_infra,seguranca,qa,pesquisador"],
  ["mpesq", "Métodos e Técnicas de Pesquisa", 32, 32, 0, "fundamentos", "OBBGSIN.002", "obrigatoria", "", "2", "Método científico, ABNT e como escrever projeto e artigo.", "data_scientist,project_manager,ai_engineer,pesquisador"],
  ["poo1", "Programação Orientada a Objetos I", 64, 30, 34, "dev", "OBBGSIN.010", "obrigatoria", "ip", "2", "Classes, objetos, herança e polimorfismo (em Java).", "fullstack,qa,game_dev"],
  ["sd", "Sistemas Digitais e Circuitos Combinacionais", 64, 44, 20, "infra", "OBBGSIN.013", "obrigatoria", "", "2", "Circuitos lógicos e a base eletrônica dos computadores.", "devops_infra"],
  // ---- 3º período
  ["aed2", "Algoritmos e Estrutura de Dados II", 64, 34, 30, "dev", "OBBGSIN.015", "obrigatoria", "aed1", "3", "Árvores, grafos e algoritmos avançados de busca.", "fullstack,data_scientist,game_dev,ai_engineer"],
  ["bd1", "Banco de Dados I", 64, 34, 30, "dados", "OBBGSIN.016", "obrigatoria", "ip", "3", "Modelagem relacional e SQL.", "fullstack,data_scientist,it_consultant"],
  ["contab", "Contabilidade", 64, 64, 0, "gestao", "OBBGSIN.018", "obrigatoria", "adm1", "3", "Balanço, fluxo de caixa e demonstrações financeiras.", "project_manager,it_consultant,empreendedor"],
  ["arq", "Arquitetura e Organização de Computadores", 64, 44, 20, "infra", "OBBGSIN.024", "obrigatoria", "sd", "3", "Como a CPU, a memória e os barramentos funcionam.", "devops_infra,seguranca"],
  ["es1", "Engenharia de Software I", 64, 34, 30, "eng_sw", "OBBGSIN.017", "obrigatoria", "isi,poo1", "3", "Requisitos, UML, métodos ágeis e testes.", "fullstack,ux_ui,qa,project_manager"],
  // ---- 4º período
  ["alg", "Álgebra Linear e Geometria Analítica", 64, 64, 0, "fundamentos", "OBBGSIN.021", "obrigatoria", "calc", "4", "Vetores e matrizes, base de gráficos 3D e aprendizado de máquina.", "data_scientist,game_dev,ai_engineer"],
  ["poo2", "Programação Orientada a Objetos II", 64, 30, 34, "dev", "OBBGSIN.022", "obrigatoria", "poo1", "4", "Interface gráfica, threads, persistência e padrões de projeto.", "fullstack,game_dev"],
  ["md", "Matemática Discreta", 64, 44, 20, "fundamentos", "OBBGSIN.020", "obrigatoria", "", "4", "Lógica, conjuntos e teoria dos grafos.", "data_scientist,game_dev,ai_engineer,pesquisador"],
  ["so", "Sistemas Operacionais", 64, 44, 20, "infra", "OBBGSIN.030", "obrigatoria", "arq", "4", "Processos, memória, arquivos e escalonamento.", "fullstack,devops_infra,seguranca"],
  ["web", "Programação Web", 64, 20, 44, "dev", "OBBGSIN.023", "obrigatoria", "poo1,aed1", "4", "Sites e sistemas web dinâmicos com HTML, CSS e JavaScript.", "fullstack,ux_ui,qa"],
  // ---- 5º período
  ["es2", "Engenharia de Software II", 64, 34, 30, "eng_sw", "OBBGSIN.041", "obrigatoria", "es1", "5", "Arquitetura, DevOps, REST/GraphQL e reuso de software.", "fullstack,devops_infra,qa,project_manager"],
  ["pe", "Probabilidade e Estatística", 64, 64, 0, "fundamentos", "OBBGSIN.031", "obrigatoria", "calc", "5", "Análise de dados, probabilidade e testes de hipóteses.", "data_scientist,ai_engineer,pesquisador"],
  ["redes1", "Redes de Computadores I", 64, 44, 20, "infra", "OBBGSIN.029", "obrigatoria", "so", "5", "Modelo OSI e TCP/IP, endereçamento, roteamento e sockets.", "fullstack,devops_infra,seguranca"],
  ["gov", "Governança e Gestão da Informação", 64, 44, 20, "gestao", "OBBGSIN.019", "obrigatoria", "adm1,es1", "5", "Governança de TI, gestão da informação e do conhecimento.", "devops_infra,seguranca,project_manager,it_consultant"],
  // ---- 6º período
  ["paa", "Projeto e Análise de Algoritmos", 64, 44, 20, "dev", "OBBGSIN.038", "obrigatoria", "aed2,md", "6", "Complexidade, programação dinâmica e problemas NP-completos.", "fullstack,data_scientist,ai_engineer,pesquisador"],
  ["mob", "Programação para Dispositivos Móveis", 64, 34, 30, "dev", "OBBGSIN.039", "obrigatoria", "web,poo2", "6", "Aplicativos para smartphones e tablets.", "fullstack,ux_ui"],
  ["sad", "Sistemas de Apoio à Decisão", 64, 44, 20, "dados", "OBBGSIN.036", "obrigatoria", "bd1,gov", "6", "Sistemas gerenciais, ERP e apoio à decisão nas empresas.", "data_scientist,it_consultant"],
  ["sdist", "Sistemas Distribuídos", 64, 44, 20, "infra", "OBBGSIN.037", "obrigatoria", "redes1", "6", "Sistemas em rede, tolerância a falhas e segurança.", "devops_infra,seguranca"],
  // ---- 7º período
  ["ihc", "Interface Humano Computador", 64, 44, 20, "eng_sw", "OBBGSIN.026", "obrigatoria", "es1", "7", "Usabilidade, protótipos, design centrado no usuário e acessibilidade.", "fullstack,ux_ui"],
  ["gp", "Gestão de Projetos", 32, 20, 12, "gestao", "OBBGSIN.040", "obrigatoria", "gov", "7", "Escopo, prazo, custo, qualidade e riscos de projetos.", "project_manager,empreendedor"],
  ["ia", "Inteligência Artificial", 64, 44, 20, "dados", "OBBGSIN.034", "obrigatoria", "paa,pe", "7", "Busca, aprendizado de máquina e redes neurais.", "data_scientist,game_dev,ai_engineer,pesquisador"],
  ["tcc1", "Trabalho de Conclusão de Curso I", 64, 64, 0, "fundamentos", "OBBGSIN.091", "obrigatoria", "mpesq,es1", "7", "Projeto do TCC com orientação de professor.", "pesquisador"],
  // ---- 8º período
  ["emp", "Empreendedorismo", 64, 64, 0, "gestao", "OBBGSIN.102", "obrigatoria", "gp", "8", "Plano de negócios e criação de empresas de tecnologia.", "project_manager,it_consultant,empreendedor"],
  ["qual", "Qualidade de Software", 64, 44, 20, "eng_sw", "OBBGSIN.103", "obrigatoria", "es2", "8", "Métricas, modelos de qualidade e teste de software.", "qa"],
  ["tcc2", "Trabalho de Conclusão de Curso II", 64, 64, 0, "fundamentos", "OBBGSIN.092", "obrigatoria", "tcc1", "8", "Conclusão do TCC (artigo ou monografia) e apresentação.", "pesquisador"],
  // ---- Optativas específicas
  ["bd2", "Banco de Dados II", 64, 34, 30, "dados", "OBBGSIN.033", "optativa_especifica", "bd1", "0", "Armazenamento em disco, consultas e estruturas avançadas.", "fullstack,data_scientist"],
  ["redes2", "Redes de Computadores II", 64, 34, 30, "infra", "PPC 2017", "optativa_especifica", "redes1", "0", "Aprofundamento em redes (conforme PPC 2017).", "devops_infra,seguranca"],
  ["cg", "Computação Gráfica", 64, 32, 32, "dev", "OBBGSIN.070", "optativa_especifica", "alg,poo1", "0", "Gráficos 2D/3D, animação e jogos.", "ux_ui,game_dev"],
  ["cn", "Cálculo Numérico", 64, 64, 0, "fundamentos", "OBBGSIN.079", "optativa_especifica", "calc", "0", "Métodos numéricos e erros de aritmética computacional.", "data_scientist,game_dev,ai_engineer,pesquisador"],
  ["gpsw", "Gerência de Projetos de Software", 64, 32, 32, "eng_sw", "OBBGSIN.049", "optativa_especifica", "es1", "0", "Estimativas, riscos e gestão ágil de projetos de software.", "project_manager"],
  ["afin", "Administração Financeira I", 64, 64, 0, "gestao", "OBBGSIN.035", "optativa_especifica", "", "0", "Mercado financeiro, capital de giro e avaliação de ações.", "it_consultant,empreendedor"],
  ["aemp", "Avaliação de Empresas", 64, 64, 0, "gestao", "OBBGSIN.057", "optativa_especifica", "", "0", "Como calcular o valor de empresas e projetos.", "it_consultant"],
  ["comport", "Comportamento Organizacional", 64, 64, 0, "gestao", "OBBGSIN.025", "optativa_especifica", "", "0", "Liderança, motivação, conflito e cultura nas organizações.", "project_manager"],
  ["consult", "Consultoria Empresarial", 64, 64, 0, "gestao", "OBBGSIN.081", "optativa_especifica", "gov", "0", "Diagnóstico organizacional e serviços de consultoria.", "it_consultant"],
  ["gamb", "Gestão Ambiental", 64, 64, 0, "gestao", "OBBGSIN.055", "optativa_especifica", "", "0", "Gestão ambiental nas empresas (ISO, PDCA).", ""],
  ["ginov", "Gestão da Inovação", 64, 64, 0, "gestao", "OBBGSIN.054", "optativa_especifica", "adm1", "0", "Criatividade e inovação como vantagem competitiva.", "it_consultant,empreendedor"],
  ["grh", "Gestão de Recursos Humanos", 64, 64, 0, "gestao", "OBBGSIN.094", "optativa_especifica", "", "0", "Recrutamento, treinamento e avaliação de pessoas.", "project_manager"],
  ["gserv", "Gestão de Serviços", 64, 64, 0, "gestao", "OBBGSIN.060", "optativa_especifica", "", "0", "Serviços, marketing de serviços e atendimento ao cliente.", "it_consultant,empreendedor"],
  ["gcon", "Gestão do Conhecimento", 64, 64, 0, "gestao", "OBBGSIN.059", "optativa_especifica", "", "0", "Aprendizagem organizacional e gestão por competências.", "it_consultant"],
  ["ing2", "Inglês Instrumental II", 32, 32, 0, "fundamentos", "OBBGSIN.006", "optativa_especifica", "ing1", "0", "Escrita de textos técnicos em inglês.", "pesquisador"],
  ["ingn", "Inglês para Negócios I", 32, 32, 0, "fundamentos", "OBBGSIN.083", "optativa_especifica", "", "0", "Inglês prático para o ambiente de trabalho.", ""],
];

export const DISCIPLINAS: Disciplina[] = rows.map(([id, nome, ch, chT, chP, area, codigo, tipo, pre, periodo, ementa, carreiras]) => ({
  id, nome, ch, chT, chP, area, codigo, tipo,
  pre: pre ? pre.split(",") : [],
  ementa,
  periodo: Number(periodo),
  carreiras: carreiras ? carreiras.split(",") : [],
}));

export const DISC_BY_ID = Object.fromEntries(DISCIPLINAS.map((d) => [d.id, d])) as Record<string, Disciplina>;

export const UNLOCKS: Record<string, string[]> = {};
DISCIPLINAS.forEach((d) => d.pre.forEach((p) => (UNLOCKS[p] = [...(UNLOCKS[p] || []), d.id])));

export const OBRIGATORIAS = DISCIPLINAS.filter((d) => d.tipo === "obrigatoria");
export const OPTATIVAS = DISCIPLINAS.filter((d) => d.tipo !== "obrigatoria");
export const PERIODOS = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// ============================================================================
// CARREIRAS — cada uma é um personagem jogável com ficha de RPG
// ============================================================================

export interface Career {
  id: string;
  nome: string;
  tagline: string;
  descricao: string;
  cor: string;
  cls: string;
  raca: string;
  antecedente: string;
  foco: AreaId[];
  overrides?: Record<string, number>;
  tools: { icon: string; nome: string }[];
  img?: string;
  /** Filtro CSS aplicado ao sprite (para variantes de cor de um mesmo desenho). */
  imgFilter?: string;
  avatar?: AvatarSpec;
}

export const CARREIRAS: Career[] = [
  {
    id: "fullstack", nome: "Dev Full-Stack", tagline: "Cria aplicações completas, do visual ao servidor.",
    descricao: "Constrói interfaces e APIs para web e mobile.",
    cor: "#48a848", cls: "Ranger do Código", raca: "Desenvolvimento",
    antecedente: "Construtor(a) de Produtos",
    foco: ["dev", "dados"],
    overrides: { web: 5, mob: 5, poo2: 5, aed2: 4, es2: 4, bd2: 4, paa: 3 },
    tools: [{ icon: "⚔", nome: "JavaScript / Java" }, { icon: "🗡", nome: "APIs REST & Web" }, { icon: "📜", nome: "SQL & Git" }, { icon: "📱", nome: "Apps móveis" }],
    img: fullstackImg,
  },
  {
    id: "data_scientist", nome: "Cientista de Dados", tagline: "Transforma dados em decisões.",
    descricao: "Bancos de dados, estatística e IA para achar padrões e montar painéis.",
    cor: "#58a0e8", cls: "Mago Oráculo", raca: "Dados",
    antecedente: "Leitor(a) de Padrões",
    foco: ["dados", "fundamentos"],
    overrides: { ia: 5, pe: 5, sad: 5, bd1: 5, bd2: 5, paa: 4, calc: 4, cn: 4 },
    tools: [{ icon: "🔮", nome: "Machine Learning" }, { icon: "◆", nome: "SQL e modelagem" }, { icon: "∑", nome: "Estatística" }, { icon: "📊", nome: "Painéis de decisão" }],
    img: dataImg,
  },
  {
    id: "devops_infra", nome: "Infra & DevOps", tagline: "Mantém redes, servidores e nuvem funcionando.",
    descricao: "Cuida da infraestrutura, automação e comunicação entre sistemas.",
    cor: "#f85858", cls: "Anão Ferreiro", raca: "Infraestrutura",
    antecedente: "Guardião(ã) dos Servidores",
    foco: ["infra", "eng_sw"],
    overrides: { so: 5, redes1: 5, redes2: 5, sdist: 5, arq: 4, es2: 4, sd: 3 },
    tools: [{ icon: "🔧", nome: "Linux e hardware" }, { icon: "🌐", nome: "Redes e roteamento" }, { icon: "⚙", nome: "DevOps e entrega" }, { icon: "🏰", nome: "Sistemas distribuídos" }],
    img: infraImg,
  },
  {
    id: "seguranca", nome: "Segurança da Informação", tagline: "Protege dados e sistemas.",
    descricao: "Une redes, sistemas operacionais, governança e legislação para reduzir riscos.",
    cor: "#38b8b8", cls: "Ladino Sombrio", raca: "Infraestrutura",
    antecedente: "Caçador(a) de Vulnerabilidades",
    foco: ["infra", "gestao"],
    overrides: { sdist: 5, redes2: 5, so: 5, redes1: 5, etica: 4, gov: 4, arq: 3 },
    tools: [{ icon: "🛡", nome: "Defesa de redes" }, { icon: "🗝", nome: "Análise de riscos" }, { icon: "📜", nome: "LGPD e ética" }, { icon: "🔍", nome: "Auditoria de TI" }],
    img: segImg,
  },
  {
    id: "ux_ui", nome: "UX/UI & Product Designer", tagline: "Projeta a experiência do usuário.",
    descricao: "Design centrado no ser humano, protótipos e acessibilidade.",
    cor: "#a070e0", cls: "Bardo das Interfaces", raca: "Eng. de Software",
    antecedente: "Encantador(a) de Usuários",
    foco: ["eng_sw", "dev"],
    overrides: { ihc: 5, web: 4, cg: 4, mob: 4, es1: 4, port: 3 },
    tools: [{ icon: "🖌", nome: "Prototipagem" }, { icon: "✦", nome: "Pesquisa com usuário" }, { icon: "🌐", nome: "HTML/CSS" }, { icon: "♿", nome: "Acessibilidade" }],
    img: uxuiImg,
  },
  {
    id: "qa", nome: "Qualidade e Testes (QA)", tagline: "Garante que o software funcione bem.",
    descricao: "Testes, métricas e processos de qualidade.",
    cor: "#38b8b8", cls: "Clérigo Investigador", raca: "Eng. de Software",
    antecedente: "Caçador(a) de Bugs",
    foco: ["eng_sw", "dev"],
    overrides: { qual: 5, es1: 5, es2: 5, web: 3, ihc: 3, mpesq: 2 },
    tools: [{ icon: "🔍", nome: "Testes e inspeção" }, { icon: "🧪", nome: "Casos de teste" }, { icon: "✦", nome: "Métricas de qualidade" }, { icon: "📜", nome: "Requisitos" }],
    img: qaImg,
  },
  {
    id: "game_dev", nome: "Jogos & Computação Gráfica", tagline: "Cria jogos, simulações e gráficos.",
    descricao: "Programação, matemática e computação gráfica.",
    cor: "#68d868", cls: "Artífice de Mundos", raca: "Desenvolvimento",
    antecedente: "Criador(a) de Realidades",
    foco: ["dev", "fundamentos"],
    overrides: { cg: 5, poo2: 5, alg: 4, md: 4, aed2: 4, ia: 3, web: 3 },
    tools: [{ icon: "🎮", nome: "Game loop e física" }, { icon: "◆", nome: "Computação gráfica" }, { icon: "∑", nome: "Álgebra e geometria" }, { icon: "⚔", nome: "POO avançada" }],
    img: gameImg,
  },
  {
    id: "project_manager", nome: "Gerente de Projetos / Scrum Master", tagline: "Lidera equipes e entregas.",
    descricao: "Conecta clientes e times, cuidando de prazo, custo e valor.",
    cor: "#c078e0", cls: "Paladino Estrategista", raca: "Gestão",
    antecedente: "Líder de Guildas",
    foco: ["gestao", "eng_sw"],
    overrides: { gp: 5, gov: 5, gpsw: 5, comport: 4, es1: 4, grh: 4, contab: 3, emp: 3 },
    tools: [{ icon: "♛", nome: "Escopo, prazo e custo" }, { icon: "✦", nome: "Métodos ágeis" }, { icon: "📜", nome: "Governança de TI" }, { icon: "🧑‍🤝‍🧑", nome: "Liderança de time" }],
    img: projectImg,
  },
  {
    id: "it_consultant", nome: "Consultor de TI & Negócios", tagline: "Alinha a TI aos objetivos da empresa.",
    descricao: "Processos, governança, sistemas gerenciais e consultoria.",
    cor: "#d8a830", cls: "Conselheiro da Corte", raca: "Gestão",
    antecedente: "Conselheiro de Rei",
    foco: ["gestao", "dados"],
    overrides: { gov: 5, sad: 5, consult: 5, contab: 4, adm1: 4, ginov: 3, gcon: 3, aemp: 3 },
    tools: [{ icon: "♛", nome: "Governança (COBIT/ITIL)" }, { icon: "📊", nome: "Apoio à decisão" }, { icon: "📜", nome: "Diagnóstico organizacional" }, { icon: "💰", nome: "Finanças e contabilidade" }],
    img: consultantImg,
  },
  {
    id: "empreendedor", nome: "Empreendedor / Startups", tagline: "Cria o próprio negócio de tecnologia.",
    descricao: "Une visão de negócio, finanças, inovação e produto.",
    cor: "#f8d830", cls: "Mercador Aventureiro", raca: "Gestão",
    antecedente: "Fundador(a) de Guilda",
    foco: ["gestao", "dev"],
    overrides: { emp: 5, afin: 5, ginov: 5, gserv: 4, gp: 4, adm1: 4, gamb: 2, web: 3 },
    tools: [{ icon: "💡", nome: "Modelo de negócios" }, { icon: "💰", nome: "Finanças e valuation" }, { icon: "🚀", nome: "Gestão da inovação" }, { icon: "⚔", nome: "Protótipo de produto" }],
    img: founderImg,
  },
  {
    id: "ai_engineer", nome: "Engenharia e Pesquisa em IA", tagline: "Desenvolve modelos inteligentes.",
    descricao: "Machine Learning e redes neurais, com forte base matemática.",
    cor: "#78c8f8", cls: "Arcanista de IA", raca: "Dados",
    antecedente: "Invocador(a) de Modelos",
    foco: ["dados", "fundamentos"],
    overrides: { ia: 5, paa: 5, alg: 5, pe: 5, cn: 4, aed2: 4, calc: 4, md: 3 },
    tools: [{ icon: "🔮", nome: "Redes neurais" }, { icon: "∑", nome: "Álgebra linear" }, { icon: "⚙", nome: "Otimização" }, { icon: "📜", nome: "Leitura de artigos" }],
    img: dataImg,
    imgFilter: "hue-rotate(-18deg) saturate(1.25) brightness(1.08)",
  },
  {
    id: "pesquisador", nome: "Pesquisador / Docente", tagline: "Segue para mestrado e pesquisa.",
    descricao: "Método científico, TCC e artigos, base para pós-graduação.",
    cor: "#b09060", cls: "Sábio Erudito", raca: "Fundamentos",
    antecedente: "Escriba da Academia",
    foco: ["fundamentos", "dados"],
    overrides: { tcc1: 5, tcc2: 5, mpesq: 5, cn: 4, pe: 4, ing2: 3, md: 3, paa: 3 },
    tools: [{ icon: "📖", nome: "Método científico" }, { icon: "📜", nome: "Escrita de artigos" }, { icon: "∑", nome: "Estatística" }, { icon: "🧪", nome: "Iniciação científica" }],
    img: consultantImg,
    imgFilter: "sepia(0.55) hue-rotate(-12deg) saturate(0.8) brightness(0.95)",
  },
];

export const CAREER_BY_ID = Object.fromEntries(CARREIRAS.map((c) => [c.id, c])) as Record<string, Career>;

/** Peso (bônus de +1 a +5) que uma disciplina dá para uma carreira. */
export function weightOf(d: Disciplina, c: Career): number {
  const o = c.overrides?.[d.id];
  if (o) return o;
  if (!d.carreiras.includes(c.id)) return 0;
  return c.foco.includes(d.area) ? 4 : 3;
}

const weightCache = new Map<string, Record<string, number>>();
export function weightsOf(c: Career): Record<string, number> {
  const hit = weightCache.get(c.id);
  if (hit) return hit;
  const map: Record<string, number> = {};
  DISCIPLINAS.forEach((d) => {
    const w = weightOf(d, c);
    if (w > 0) map[d.id] = w;
  });
  weightCache.set(c.id, map);
  return map;
}

/** Atributos estilo RPG: uma pontuação (6-20) por área do curso. */
export function careerStats(c: Career) {
  const w = weightsOf(c);
  const total = Object.values(w).reduce((a, b) => a + b, 0) || 1;
  return AREAS.map((a) => {
    const sum = DISCIPLINAS.filter((d) => d.area === a.id).reduce((acc, d) => acc + (w[d.id] || 0), 0);
    const share = sum / total;
    const score = Math.min(20, Math.max(6, Math.round(6 + share * 42)));
    return { area: a, score, mod: Math.floor((score - 10) / 2) };
  });
}

export interface SkillRow {
  disc: Disciplina;
  weight: number;
}

export function careerSkills(c: Career): SkillRow[] {
  const w = weightsOf(c);
  return Object.entries(w)
    .map(([id, weight]) => ({ disc: DISC_BY_ID[id], weight }))
    .sort((a, b) => b.weight - a.weight || a.disc.periodo - b.disc.periodo || a.disc.nome.localeCompare(b.disc.nome));
}

export function periodLabel(p: number) {
  return p === 0 ? "Optativa" : `${p}º período`;
}

export const CH_OBRIGATORIAS = OBRIGATORIAS.reduce((a, d) => a + d.ch, 0);
export const CH_OPTATIVAS = OPTATIVAS.reduce((a, d) => a + d.ch, 0);

// ============================================================================
// AGREGAÇÕES
// ============================================================================

export interface AreaStats {
  area: Area;
  todas: Disciplina[];
  obrigatorias: Disciplina[];
  optativas: Disciplina[];
  ch: number;
  chObrigatoria: number;
  chOptativa: number;
  periodos: number[];
  topCarreiras: { career: Career; soma: number }[];
}

export function areaStats(area: Area): AreaStats {
  const todas = DISCIPLINAS.filter((d) => d.area === area.id);
  const obrigatorias = todas.filter((d) => d.tipo === "obrigatoria");
  const optativas = todas.filter((d) => d.tipo !== "obrigatoria");
  const soma = (l: Disciplina[]) => l.reduce((a, d) => a + d.ch, 0);
  const topCarreiras = CARREIRAS.map((c) => ({
    career: c,
    soma: todas.reduce((acc, d) => acc + weightOf(d, c), 0),
  }))
    .sort((a, b) => b.soma - a.soma)
    .slice(0, 3);
  return {
    area,
    todas,
    obrigatorias,
    optativas,
    ch: soma(todas),
    chObrigatoria: soma(obrigatorias),
    chOptativa: soma(optativas),
    periodos: [...new Set(todas.filter((d) => d.periodo > 0).map((d) => d.periodo))].sort((a, b) => a - b),
    topCarreiras,
  };
}

export const AREA_STATS: AreaStats[] = AREAS.map(areaStats);

/** Participação de cada área na matriz (0-100). */
export function areaShare(area: Area) {
  const total = DISCIPLINAS.filter((d) => d.tipo === "obrigatoria").reduce((a, d) => a + d.ch, 0) || 1;
  const ch = DISCIPLINAS.filter((d) => d.area === area.id && d.tipo === "obrigatoria").reduce((a, d) => a + d.ch, 0);
  return Math.round((ch / total) * 100);
}

/** Área dominante de uma carreira (maior soma de bônus). */
export function topArea(c: Career): Area {
  return AREAS.reduce((best, a) => {
    const s = (x: Area) => DISCIPLINAS.filter((d) => d.area === x.id).reduce((acc, d) => acc + weightOf(d, c), 0);
    return s(a) > s(best) ? a : best;
  }, AREAS[0]);
}

/** Optativas que valem bônus para a carreira, ordenadas. */
export function optativasRecomendadas(c: Career) {
  return OPTATIVAS.map((d) => ({ disc: d, weight: weightOf(d, c) }))
    .filter((x) => x.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.disc.nome.localeCompare(b.disc.nome));
}

/** Primeiro período em que a trilha da carreira começa. */
export function trilha(c: Career) {
  const w = weightsOf(c);
  const periodos = Object.keys(w)
    .map((id) => DISC_BY_ID[id].periodo)
    .filter((p) => p > 0);
  const chave = Object.entries(w)
    .filter(([, v]) => v >= 4)
    .map(([id]) => DISC_BY_ID[id].periodo)
    .filter((p) => p > 0);
  return {
    inicio: periodos.length ? Math.min(...periodos) : 1,
    fim: periodos.length ? Math.max(...periodos) : 8,
    inicioChave: chave.length ? Math.min(...chave) : 1,
    fimChave: chave.length ? Math.max(...chave) : 8,
    ch: Object.keys(w).reduce((a, id) => a + DISC_BY_ID[id].ch, 0),
    chChave: Object.entries(w)
      .filter(([, v]) => v >= 4)
      .reduce((a, [id]) => a + DISC_BY_ID[id].ch, 0),
    qtd: Object.keys(w).length,
    qtdChave: Object.keys(w).filter((id) => w[id] >= 4).length,
  };
}
