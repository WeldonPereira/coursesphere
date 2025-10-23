# CourseSphere

O **CourseSphere** é um sistema web de gerenciamento de cursos desenvolvido com **React** e **Vite**.  
O projeto oferece uma interface moderna e intuitiva para controle de cursos, aulas e instrutores, simulando um ambiente real de administração acadêmica.


## Visão Geral

O objetivo do CourseSphere é proporcionar um ambiente de aprendizado virtual simples, porém completo, com funcionalidades de autenticação, cadastro de cursos e gestão de aulas. O sistema também permite adicionar instrutores aleatórios por meio da integração com a API pública [randomuser.me](https://randomuser.me/). O projeto foi construído com base em **boas práticas de desenvolvimento front-end**, **padrões de commits semânticos** e uma **arquitetura modular e escalável**.

## Tecnologias Utilizadas

- **React 19**
- **Vite 7**
- **React Router DOM**
- **Axios**
- **React Hook Form + Zod**
- **Tailwind CSS**
- **React Query**
- **React Toastify**
- **JSON Server**
- **API pública randomuser.me**

## Estrutura do Projeto
```bash
coursesphere/
├── public/
├── src/
│   ├── api/              # Configuração do Axios
│   ├── components/       # Navbar, Loader e componentes reutilizáveis
│   ├── contexts/         # Contexto de autenticação (AuthProvider)
│   ├── hooks/            # Hooks personalizados (useAuth)
│   ├── pages/            # Login, Dashboard, Formulários, etc.
│   ├── routes/           # Rotas e controle de acesso (ProtectedRoute)
│   ├── App.jsx           # Estrutura principal do app
│   └── main.jsx          # Ponto de entrada
├── db.json               # Banco de dados simulado (JSON Server)
├── package.json
└── vite.config.js
```


## Funcionalidades Principais

- **Autenticação de Usuário:** controle de acesso com rotas protegidas.  
- **Gerenciamento de Cursos:** criação, edição e listagem de cursos vinculados a usuários.  
- **Gestão de Aulas:** cadastro e controle de aulas com status e data de publicação.  
- **Atribuição de Instrutores:** integração com a API `randomuser.me` para geração automática de instrutores.  
- **Interface Responsiva:** design moderno utilizando apenas classes padrão do Tailwind.  
- **Feedback em Tempo Real:** notificações visuais de sucesso e erro com React Toastify.

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir instalado:

- **Node.js** versão 18 ou superior  
- **npm** versão 9 ou superior  
- **Git** versão 2.40 ou superior 

## Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/WeldonPereira/coursesphere.git
cd coursesphere
```
### 2. Instalar dependências
```bash
npm install
```
### 3. Iniciar o servidor local 
```bash
npm run server
```
### 4. Rodar o ambiente de desenvolvimento (em um terminal separado)
```bash
npm run dev
```
### 5. Acessar o sistema
```bash
Acesse em: http://localhost:5173
```
## Como Contribuir

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. **Fork** este repositório.  
2. **Clone** o repositório para sua máquina:
   ```bash
   git clone https://github.com/WeldonPereira/coursesphere.git
   cd coursesphere
   ```
3. Crie uma **branch** para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
4. Faça suas alterações e commit das mudanças:
   ```bash
   git commit -m "Descrição clara da alteração"
   ```
5. Push para sua branch:
   ```bash
   git push origin minha-feature
   ```
6. Abra um Pull Request no repositório original.

## Contato

Para entrar em contato, acesse meu website e escolha o canal de comunicação preferido:  
[https://weldonpereira.vercel.app/](https://weldonpereira.vercel.app/)
