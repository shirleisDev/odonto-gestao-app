# Odonto-Gestão: Sistema Móvel de Captação e Triagem Clínica

Solução de Engenharia de Software focada no comércio local de saúde de Madureira - RJ (Dra. Josiane). A plataforma converte tráfego local direto em consultas presenciais por meio de uma arquitetura RESTful assíncrona, eliminando a barreira de exclusão digital enfrentada por profissionais autônomos.

---

## Frontend Mobile (React Native + Expo SDK 56)

### Telas
| Tela | Descrição |
|---|---|
| **Início** | Hero com gradiente, métricas e avaliações de pacientes |
| **Agendar** | Funil de captação com formulário de lead + botão de emergência WhatsApp |
| **Localização** | Mapa interativo com horários de atendimento e referências |
| **Sobre** | Perfil da profissional, missão, serviços e diferenciais |

### Destaques Técnicos
- **Tema Dinâmico Dark/Light:** Detecção automática da preferência do sistema via `useColorScheme()`. Paleta definida em `theme.js` com `LIGHT_COLORS` e `DARK_COLORS`, aplicada por hook `useTheme()` em todas as telas e na barra de navegação.
- **Formulário de Lead:** Três campos obrigatórios — nome, WhatsApp (com máscara `(XX) XXXXX-XXXX`) e data da consulta (seletor nativo `DateTimePicker` com suporte a Android e iOS).
- **Botão de Emergência:** Acesso direto ao WhatsApp sem preenchimento de formulário, via `Linking`.
- **Resiliência de Rede:** `AbortController` com timeout de 10 segundos; tratamento diferenciado para erros de cancelamento (React Native) e falhas genéricas.
- **Feedback de UX:** Indicador de carregamento (`ActivityIndicator`) durante o envio; alerta de sucesso com limpeza automática dos campos.

### Dependências Principais
```
expo ~56.0.11
react-native 0.85.3
@react-navigation/bottom-tabs ^7.18.0
@react-navigation/native ^7.3.1
@react-native-community/datetimepicker
expo-linear-gradient
@expo/vector-icons
```

---

## Backend REST (PHP 8.2 + MongoDB)

Endpoint único `index.php` exposto via XAMPP (local) e Render (produção).

### Fluxo de Requisição
1. Restrição de método: aceita apenas `POST`
2. Validação de entrada: `nome`, `whatsapp` e `data_consulta` são obrigatórios
3. Validação de data: `strtotime()` garante formato ISO válido
4. Persistência: `MongoDB\BSON\UTCDateTime` para `data_consulta` e `createdAt`
5. Resposta: JSON com `{ success: true, id }` ou `{ error }` com HTTP status adequado

### Campos Persistidos (Collection `customers`)
| Campo | Tipo MongoDB |
|---|---|
| `nome` | String |
| `whatsapp` | String |
| `data_consulta` | UTCDateTime |
| `createdAt` | UTCDateTime |

### Variáveis de Ambiente (`.env`)
```
MONGODB_URI=
MONGODB_DB=
MONGODB_COLLECTION=
EXPO_PUBLIC_API_URL=
```

---

## Estrutura do Repositório

```
odonto-gestao-app/
├── index.php                  # API REST — controlador e persistência
├── src/Document/Lead.php      # Documento ODM (Doctrine MongoDB)
├── App.js                     # Navegação (Bottom Tab) + tema global
├── theme.js                   # Paleta de cores light/dark + useTheme()
├── app.json                   # Configuração Expo (userInterfaceStyle: automatic)
├── screens/
│   ├── HomeScreen.js
│   ├── AgendamentoScreen.js
│   ├── LocalizacaoScreen.js
│   └── SobreScreen.js
└── vendor/                    # Dependências PHP (Composer)
```

---

## Como Executar Localmente

### Backend
```bash
# Com XAMPP (Apache)
# Copiar o projeto para htdocs/ e iniciar o Apache no painel XAMPP

# Ou com servidor embutido do PHP
php -S localhost:80
```

### Frontend
```bash
npm install
npx expo start -c
```

Aponte o Expo Go do smartphone para o QR Code gerado no terminal, ou use `npx expo run:android` para um build nativo.
