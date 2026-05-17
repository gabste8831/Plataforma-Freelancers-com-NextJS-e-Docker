# FreelaCloud - Plataforma Freelance para Profissionais

## Descrição da Aplicação
O **FreelaCloud** é uma plataforma moderna simulando um ambiente de Cloud Computing real, desenvolvida para conectar Profissionais Autônomos (Freelancers) a Clientes que precisam de serviços. O sistema permite o cadastro, listagem e exclusão (CRUD completo) de Vagas de Projetos e de Perfis Profissionais, além do vínculo dinâmico entre ambos.

## Tecnologias Utilizadas
- **Frontend & Backend:** Node.js com Next.js (App Router)
- **Estilização:** Tailwind CSS (Dark Mode Premium)
- **Banco de Dados:** PostgreSQL 16 (Relacional)
- **ORM:** Prisma (Type-safe access)
- **Infraestrutura/DevOps:** Docker e Docker Compose

## Arquitetura Utilizada
A solução utiliza **arquitetura de microserviços conteinerizada**, executando em containers isolados orquestrados pelo Docker Compose:
1. **Container Web (`app`):** Roda a aplicação Next.js, executando o servidor na porta interna `3000`.
2. **Container Banco (`db`):** Roda o PostgreSQL na porta padrão `5432`.
3. **Persistência de Dados:** Utiliza um Volume Docker (`pgdata`) mapeado para `/var/lib/postgresql/data`, garantindo que os dados persistam mesmo após a remoção dos containers.
4. **Rede Dedicada:** Os containers operam em uma rede `bridge` customizada chamada `cloud-network`.

## Estrutura do Projeto
```text
projeto/
  app/                # Código fonte (Next.js)
  prisma/             # Schema e modelos do banco
  Dockerfile          # Definição da imagem da aplicação
  docker-compose.yml  # Orquestração total do ambiente
  README.md           # Documentação técnica (este arquivo)
  evidencias/         # Prints solicitados pelo professor
```

## Link Docker Hub
[gabrielste/freelacloud-app](https://hub.docker.com/r/gabrielste/freelacloud-app)

## Variáveis de Ambiente
- `DATABASE_URL`: URL de conexão configurada internamente no Docker Compose para apontar para o container do banco.

## Portas Utilizadas
- **Portas Web:** `3000` (Acesso do usuário)
- **Portas Internas:** `5432` (Comunicação Banco <-> App)

## Instruções Completas de Execução

### Pré-requisitos
- **Docker Desktop** (ou Docker Engine + Docker Compose V2).
- Garantir que a porta `3000` e a porta `5432` (ou `5436` conforme mapeado) estejam livres no host.

### Comandos Necessários
Para iniciar o ambiente completo, execute o comando abaixo na raiz do projeto:
```bash
docker compose up -d --build
```

Para visualizar os logs da aplicação e confirmar o status:
```bash
docker compose logs -f app
```

Para encerrar o ambiente e remover os containers:
```bash
docker compose down
```

### Como Acessar a Aplicação
Após os containers subirem, acesse no seu navegador:
**URL da Plataforma:** [http://localhost:3000](http://localhost:3000)

## Como Validar a Persistência (Critério de Avaliação)
1. Acesse o sistema e cadastre um novo profissional ou vaga.
2. No terminal, derrube os containers com `docker compose down`.
3. Suba novamente com `docker compose up -d`.
4. Valide que os dados inseridos **continuam lá**, provando que o volume `pgdata` está funcionando.

## Publicação no DockerHub (Referência)
Passos utilizados para a publicação da imagem original:
```bash
docker login
docker build -t gabrielste/freelacloud-app:latest .
docker push gabrielste/freelacloud-app:latest
```

## Pasta de Evidências
A pasta `/evidencias` contém os registros visuais obrigatórios:
- **Desenvolvimento:** Aplicação funcionando localmente.
- **Docker:** Build da imagem e listagem técnica.
- **Compose:** Orquestração e status dos serviços.
- **Banco:** Conexão ativa, cadastro e listagem.
- **Persistência:** Dados seguros após reinicialização.
- **DockerHub:** Página da imagem publicada.
