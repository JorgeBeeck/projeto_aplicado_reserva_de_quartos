# Instalação e Configuração do Projeto

Este guia fornece instruções passo a passo para instalar e configurar o projeto em sua máquina local.

## Pré-requisitos

Certifique-se de ter o seguinte software instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [npm](https://www.npmjs.com/) (normalmente instalado automaticamente com o Node.js)
- Um editor de código (recomendado: [Visual Studio Code](https://code.visualstudio.com/))

## Passos

1. **Clone o Repositório:**

   ```bash
   git clone <URL_do_repositório>
   ```

2. **Navegue até o Diretório do Projeto:**

   ```bash
   cd gerenciamento-quartos
   ```

3. **Instale as Dependências do Projeto:**

   ```bash
   npm install
   ```

4. **Configure o Firebase:**

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - Copie as configurações do SDK do Firebase para o arquivo `src/firebase.js`.
   - Certifique-se de habilitar a autenticação por e-mail/senha no console do Firebase.

5. **Execute o Projeto:**

   ```bash
   npm start
   ```

   Isso iniciará o servidor de desenvolvimento e abrirá automaticamente a aplicação no seu navegador padrão.

6. **Teste a Aplicação:**

   - Abra o navegador e acesse `http://localhost:3000`.
   - Você será redirecionado para a página de login. Faça login com uma conta válida.
   - Após o login, você deve ser redirecionado para a página de gerenciamento de quartos.

## Suporte

Se você encontrar algum problema durante a instalação ou configuração, sinta-se à vontade para entrar em contato com [Nome do Responsável] para obter ajuda.

---

Com esse guia, os outros membros da equipe devem ser capazes de instalar e configurar o projeto em suas máquinas locais sem problemas. Se precisar de mais alguma coisa, estou aqui para ajudar!
