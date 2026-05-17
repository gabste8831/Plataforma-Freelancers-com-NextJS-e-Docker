# FreelaCloud - Plataforma Freelance Conteinerizada

Uma aplicação moderna desenvolvida para conectar grandes talentos de tecnologia a projetos desafiadores. Este projeto foi construído focando em conceitos de **Cloud Computing** e **DevOps**, utilizando uma arquitetura multicontainer orquestrada pelo Docker Compose.

## 🚀 Tecnologias
- **Frontend/Backend:** Next.js (Node.js)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Infraestrutura:** Docker & Docker Compose

## 🐳 Como rodar esta imagem

Para executar o ambiente completo (Aplicação + Banco de Dados + Rede + Volumes), recomendamos o uso do repositório completo e do Docker Compose:

1. Clone o repositório do GitHub:
   `https://github.com/gabste8831/Plataforma-Freelancers-com-NextJS-e-Docker`
2. Na raiz do projeto, execute:
   ```bash
   docker compose up -d
   ```

A aplicação estará disponível em `http://localhost:3000`.

## 🏗️ Arquitetura
A imagem deste repositório contém a camada de interface e API da plataforma. Ela foi desenhada para comunicar-se nativamente com um container PostgreSQL através de variáveis de ambiente, garantindo isolamento e escalabilidade.

---
*Projeto desenvolvido para a disciplina de Cloud Computing do Curso de Sistemas de Informação - UNIDAVI.*
