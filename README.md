# FreelaCloud - Plataforma Freelance para Profissionais

## Descrição da Aplicação
O **FreelaCloud** é uma plataforma moderna simulando um ambiente de Cloud Computing real, desenvolvida para conectar Profissionais Autônomos (Freelancers) a Clientes que precisam de serviços. O sistema permite o cadastro, listagem e exclusão (CRUD completo) de Vagas de Projetos e de Perfis Profissionais, além do vínculo dinâmico entre ambos.

## Tecnologias Utilizadas
- **Frontend & Backend:** Node.js com Next.js (App Router)
- **Estilização:** Tailwind CSS (Elite Dark Mode)
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

## Variáveis de Ambiente
- `DATABASE_URL`: URL de conexão no formato `postgresql://user:pass@host:port/dbname`.
*(No Docker Compose, o host é definido como `db`, o nome do serviço).*

## Portas Utilizadas
- Portas Web: `3000` (Acesso do usuário)
- Portas Internas: `5432` (Comunicação Banco <-> App)

## Instruções Completas de Execução

### Link Docker Hub
[https://hub.docker.com/r/gabrielste/freelacloud-app]

### Pré-requisitos
- **Docker Desktop** (ou Docker Engine + Docker Compose V2).
- Garantir que a porta `3000` e `5436` (ou `5432`) estejam livres.

### Comandos Necessários
Para iniciar o ambiente completo:
```bash
docker compose up -d --build
```

Para visualizar os logs:
```bash
docker compose logs -f app
```

Para encerrar o ambiente:
```bash
docker compose down
```

## Publicação no DockerHub
Para publicar a sua imagem personalizada no DockerHub:

1. Realize o login no terminal:
```bash
docker login
```

2. Construa e tagueie a imagem (substitua `seu-usuario` para o seu username do DockerHub):
```bash
docker build -t seu-usuario/freelacloud-app:latest .
```

3. Envie para o repositório público:
```bash
docker push seu-usuario/freelacloud-app:latest
```

## Pasta de Evidências
A pasta `/evidencias` contém os registros visuais obrigatórios com terminal visível, comprovando a execução real em ambiente conteinerizado e a persistência dos dados.
- **Desenvolvimento:** Aplicação funcionando localmente.
- **Docker:** Build da imagem e listagem técnica.
- **Compose:** Orquestração e status dos serviços.
- **Banco:** Conexão ativa, cadastro e listagem.
- **Persistência:** Dados seguros após reinicialização.
- **DockerHub:** Página da imagem publicada.
