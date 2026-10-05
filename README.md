# 🎓 Mapa Conceptual & Carreiras BSI — IFMG Campus Ouro Branco

**Mapa Conceptual e Matriz Curricular Interativa** do curso de **Bacharelado em Sistemas de Informação (BSI)** do IFMG Campus Ouro Branco, projetado para estudantes do Ensino Médio explorarem seu futuro acadêmico e profissional.

---

## ✨ Funcionalidades

- 🗺️ **Mapa Interativo** — Visualize todas as disciplinas e pré-requisitos de forma intuitiva, do 1º ao 8º Período.
- 📋 **Grid Roadmap** — Visualização estilo *Roadmap.sh* com colunas por semestre e cards clicáveis.
- 🎯 **Filtro por Carreira/Perfil Profissional** — Ao clicar em uma carreira (ex: "Desenvolvedor Full-Stack"), apenas as disciplinas relevantes são iluminadas.
- 🏷️ **Filtro por Área de Conhecimento** — 6 áreas científicas: Desenvolvimento, Engenharia de Software, Infraestrutura, Dados/IA, Gestão e Fundamentos.
- 🔍 **Busca por palavra-chave** — Pesquise disciplinas e conceitos em tempo real.
- 📖 **Ficha da Disciplina (Drawer)** — Clique em qualquer disciplina para ver detalhes didáticos, pré-requisitos, disciplinas desbloqueadas e carreiras vinculadas.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **React 19** | Biblioteca principal para construção da interface de usuário |
| **TypeScript** | Tipagem estática para maior segurança e previsibilidade do código |
| **Vite** | Ferramenta de build super rápida e servidor de desenvolvimento |
| **Tailwind CSS 4** | Estilização utilitária e design responsivo |
| **CSS Custom** | Glassmorphism, animações e refinamentos de UI |

---

## 📁 Estrutura do Projeto

```
RoadMap/
├── src/                        # Código fonte (Componentes React, dados TypeScript, estilos)
├── package.json                # Dependências do projeto
├── vite.config.ts              # Configurações de build do Vite
├── bsi_roadmap_data.json       # Backup de dados - Estrutura do mapa em JSON
├── bsi_roadmap_data.js         # Backup de dados - Estrutura do mapa em JS
└── README.md                   # Este arquivo
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para executar
```bash
# 1. Instale as dependências (estando na pasta raiz do projeto)
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev

# 3. Acesse a aplicação no seu navegador: http://localhost:5173
```

---

## 📤 Gerando a Versão de Produção (Build)

Para gerar os arquivos otimizados para produção, execute na raiz do projeto:

```bash
npm run build
```

O código compilado será gerado dentro da pasta `dist/`. Esse conteúdo pode ser publicado em servidores web, GitHub Pages, Vercel, Netlify, etc.

---

## 🎓 Dados do PPC

Todos os dados são baseados na **Matriz Curricular oficial** do PPC do curso de Bacharelado em Sistemas de Informação do **IFMG Campus Ouro Branco**, incluindo:

- **32 disciplinas obrigatórias** distribuídas em 8 períodos
- **12 disciplinas optativas** mapeadas
- **6 áreas de conhecimento** científicas
- **7 perfis profissionais / carreiras de saída**
- **Pré-requisitos e cadeia de desbloqueio** entre disciplinas

---

## 📜 Licença

Projeto acadêmico desenvolvido para fins educacionais.  
© 2026 IFMG Campus Ouro Branco — Bacharelado em Sistemas de Informação.
