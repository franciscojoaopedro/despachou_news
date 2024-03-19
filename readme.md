
Arquitetura MVC para a Plataforma Despachou
Modelo (Model):

Imóvel:
ID (String)
Tipo (String: "venda" ou "aluguel")
Título (String)
Descrição (String)
Endereço (String)
CEP (String)
Cidade (String)
Estado (String)
Área (Number)
Quartos (Number)
Banheiros (Number)
Vagas de garagem (Number)
Valor (Number)
Fotos (Array de Strings)
Proprietário (ID do usuário)

Usuário:
ID (String)
Nome (String)
Email (String)
Senha (String)
Telefone (String)
Tipo (String: "proprietário" ou "inquilino")
Visão (View):

Página inicial:
Listar imóveis à venda e para aluguel
Filtrar por tipo, cidade, preço, etc.
Visualizar detalhes de um imóvel
Conta do usuário:
Criar e editar perfil
Gerenciar imóveis (adicionar, editar, remover)
Visualizar favoritos
Enviar mensagens para proprietários
Painel do proprietário:
Gerenciar imóveis (adicionar, editar, remover)
Visualizar solicitações de aluguel
Aprovar ou negar solicitações
Gerenciar inquilinos
Controlador (Controller):

Rota: /imoveis
GET /: Listar todos os imóveis
GET /:id: Visualizar um imóvel específico
POST /: Criar um novo imóvel
PUT /:id: Editar um imóvel
DELETE /:id: Remover um imóvel

Rota: /usuarios
POST /: Registrar um novo usuário
POST /login: Autenticar um usuário
GET /:id: Visualizar um usuário
PUT /:id: Editar um usuário

Rota: /favoritos
GET /: Listar favoritos
POST /:id: Adicionar um imóvel aos favoritos
DELETE /:id: Remover um imóvel dos favoritos

Rota: /mensagens
POST /: Enviar uma mensagem
Rota: /solicitacoes
GET /: Listar solicitações de aluguel
POST /: Enviar uma solicitação de aluguel
PUT /:id/aprovar: Aprovar uma solicitação de aluguel
PUT /:id/negar: Negar uma solicitação de aluguel