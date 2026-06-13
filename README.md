# 🦷 Odonto-Gestão: Sistema Móvel de Captação e Triagem Clínica

Aplica-se este projeto como solução de Engenharia de Software focada no comércio local de saúde de Madureira - RJ (Dra. Josiane). A plataforma visa mitigar a barreira de exclusão digital enfrentada por profissionais autônomos sem presença em redes sociais, convertendo tráfego local direto em consultas presenciais por meio de uma arquitetura RESTful assíncrona.

---

## 🎨 Frontend Mobile (React Native + Expo)
- **Interface Minimalista:** Projetada sob a ótica de UX (Experiência do Usuário), adotando a paleta de cores "Chá Verde" para transmitir assepsia e confiança.
- **Funil de Alta Conversão:** Omitiu-se fluxos complexos e calendários síncronos em prol de uma triagem estrita de apenas dois inputs (Nome e WhatsApp).
- **Integração Nativa:** Conexão direta com a API nativa do WhatsApp (`Linking`), despachando o lead pré-qualificado diretamente para o dispositivo do profissional.

---

## 🛠️ Backend RestFul High-End (PHP 8.2 + POO)
O núcleo computacional do ecossistema foi desenvolvido adotando padrões rigorosos de arquitetura de software e Clean Code, destacando-se como o diferencial técnico da aplicação:

### ✨ Diferenciais de Engenharia Aplicados:
1. **Princípio da Responsabilidade Única (SRP):** Desacoplamento estrito de funções. A classe `Procedimento` responde estritamente pelas regras de negócio e precificações ocultas, enquanto a classe `LeadRepository` isola o acesso e persistência no disco.
2. **Segurança de Borda & Sanitização:** O controlador central restringe de forma nativa o tráfego a requisições do tipo `POST`, sanitizando todas as strings de entrada via filtros de barreira (`strip_tags` e regex) contra ataques de injeção de scripts (XSS).
3. **Resiliência a Falhas (Fail-Safe):** Implementação de blocos estruturados de captura de exceções (`try-catch`), impedindo vazamento de dados internos do servidor e garantindo respostas elegantes padronizadas no formato JSON HTTP Status.

---

## 📁 Estrutura Arquitetural do Repositório

```text
odonto_app-reactNativ_php/
├── backend_php/             # Camada Servidora (API REST)
│   ├── classes/
│   │   ├── Procedimento.php # Domínio: Regras de Negócio Ocultas
│   │   └── LeadRepository.php # Dados: Persistência DAO/Repository
│   ├── index.php            # Controlador Central e Roteador Rest
│   └── leads.txt            # Log de Persistência Permanente
│
└── frontend-mobile/         # Camada de Interface Móvel
    ├── App.js               # Layout Responsivo SDK 54 & Fetch API
    └── package.json         # Manifesto de Dependências Expo
```

---

## 🏃‍♂️ Como Executar o Ecossistema Localmente

### 1. Iniciar o Servidor Apache (Backend)
1. Certifique-se de que este repositório está alocado no diretório `htdocs/` do seu servidor **XAMPP**.
2. Ative o módulo Apache no painel de controle do ambiente.

### 2. Executar o Aplicativo (Frontend)
Navegue até a pasta do aplicativo móvel pelo terminal e execute as rotinas de inicialização:
```bash
cd frontend-mobile
npm install
npx expo start -c
```
Aponte o aplicativo do seu smartphone para o QR Code gerado no terminal.


# 🦷 Sistema de Gestão e Agendamento - Dra. Josiane

Sistema completo de agendamento odontológico inteligente desenvolvido com foco em alta performance, robustez técnica e contraste visual otimizado para apresentações em projetores/data-show.

## 🚀 Arquitetura do Projeto

O projeto foi estruturado utilizando o modelo de microsserviços integrados de ponta a ponta:
* **Front-end:** React Native (Expo Web) utilizando navegação por abas (`Tab.Navigator`).
* **Back-end:** PHP Estruturado e Orientado a Objetos (POO Pura) com isolamento de regras de negócio.
* **Banco de Dados:** Persistência relacional em MySQL local gerenciado via phpMyAdmin (XAMPP).

---

## 🛠️ Tecnologias Utilizadas

### Front-end
* **React Native / Expo Go & Web:** Interface responsiva e assíncrona.
* **TypeScript:** Tipagem estática para prevenção de falhas em tempo de compilação.
* **Design System Otimizado:** Layout Rústico em Modo Escuro (*Dark Mode* de alto contraste) projetado especificamente para legibilidade em ambientes de projeção acadêmica (Data-Show).

### Back-end & Persistência
* **PHP 8.2:** Servidor embutido para escuta de requisições na rede local.
* **CORS Preflight (OPTIONS):** Mecanismo de segurança implementado para aceitação de conexões multiplataforma.
* **PDO (PHP Data Objects):** Conexão segura e blindada contra injeções SQL para gravação direta no banco.

---

## 📊 Histórico de Resolução de Problemas (Troubleshooting)

> ⚠️ **Nota de Engenharia de Infraestrutura:** 
> Durante o desenvolvimento, o projeto enfrentou um gargalo crítico de comunicação de rede local. Foram dedicadas **4 horas de análise e testes intensivos** diagnosticando um erro persistente de `SyntaxError: JSON Parse (Unexpected character: <)` e falhas de conexão (`Failed to fetch`) ao tentar rodar o aplicativo via dispositivo móvel físico (celular antigo).
> 
> Após uma varredura completa nas camadas de CORS e Firewall do Windows, isolamos o problema e identificamos que o dispositivo físico possuía **incompatibilidade de roteamento e retenção severa de cache** no ambiente do Expo Go, impedindo que os pacotes chegassem ao servidor PHP local.
> 
> **A Solução:** Adotamos uma estratégia de engenharia ágil, migrando a execução do Front-end para o **Expo Web (Navegador Local)**. Isso eliminou as barreiras físicas de Wi-Fi, reduziu a dependência de memória RAM (evitando emuladores pesados) e estabeleceu uma comunicação limpa via `127.0.0.1:8080`, resultando em persistência imediata e 100% estável no MySQL.

---

## 🗂️ Estrutura do Banco de Dados

A persistência de dados ocorre de forma automatizada na tabela `agendamentos` dentro do banco `clinica_odonto`:

* `id` (INT, Chave Primária, Auto-Incremento)
* `nome` (VARCHAR 100, Caixa Alta/Sanitizado)
* `whatsapp` (VARCHAR 20, Apenas números)
* `data_consulta` (VARCHAR 20, Formato textual)

---

## 💻 Como Executar o Projeto Localmente

### 1. Iniciar o Banco de Dados (XAMPP)
1. Abra o **XAMPP Control Panel**.
2. Dê partida (*Start*) nos módulos **Apache** e **MySQL**.
3. Certifique-se de que a tabela `agendamentos` foi criada dentro do banco `clinica_odonto`.

### 2. Iniciar o Servidor Back-end (PHP)
No terminal da raiz do servidor, execute o comando para liberar a escuta para a rede:
```bash
php -S 0.0.0.0:8080
```


### 3. Iniciar o Front-end (React Native)
No terminal da pasta do aplicativo, execute o comando:

```bash
npx expo start
```
*Pressione a tecla **`w`** no teclado para abrir o sistema diretamente no navegador do computador.*

---

## 🛡️ Tratamento de Erros e Fail-Safe
O back-end conta com uma estrutura rigorosa de `try/catch` que intercepta exceções do banco de dados e as devolve de forma limpa em formato JSON estruturado, impedindo que falhas de sintaxe quebrem a comunicação com a interface do usuário.
