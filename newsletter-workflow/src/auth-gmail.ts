import "dotenv/config";

import http from "node:http";

import { google } from "googleapis";

const GMAIL_MODIFY_SCOPE = "https://www.googleapis.com/auth/gmail.modify";
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI ?? "http://localhost:3000/oauth2callback";

async function main() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Defina GMAIL_CLIENT_ID e GMAIL_CLIENT_SECRET em newsletter-workflow/.env antes de rodar este comando."
    );
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);
  const authUrl = auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [GMAIL_MODIFY_SCOPE],
  });

  console.log("Abra esta URL no navegador e autorize o acesso ao Gmail para ler, marcar como lido e aplicar labels:");
  console.log(authUrl);
  console.log("");
  console.log(`Aguardando callback em ${REDIRECT_URI} ...`);

  const code = await waitForAuthorizationCode(REDIRECT_URI);
  const { tokens } = await auth.getToken(code.trim());

  if (!tokens.refresh_token) {
    throw new Error(
      "O Google não retornou refresh_token. Revogue o acesso do app na sua conta Google e rode novamente com prompt=consent."
    );
  }

  console.log("");
  console.log("Adicione esta variável ao newsletter-workflow/.env:");
  console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
}

function waitForAuthorizationCode(redirectUri: string): Promise<string> {
  const expectedUrl = new URL(redirectUri);
  const port = Number(expectedUrl.port || 80);
  const pathname = expectedUrl.pathname;

  return new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      try {
        const requestUrl = new URL(request.url ?? "/", redirectUri);

        if (requestUrl.pathname !== pathname) {
          response.writeHead(404);
          response.end("Not found");
          return;
        }

        const error = requestUrl.searchParams.get("error");
        if (error) {
          response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
          response.end(`OAuth error: ${error}`);
          server.close();
          reject(new Error(`OAuth error: ${error}`));
          return;
        }

        const code = requestUrl.searchParams.get("code");
        if (!code) {
          response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
          response.end("Missing authorization code.");
          return;
        }

        response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
        response.end("Autorização recebida. Você pode fechar esta aba e voltar ao terminal.");
        server.close();
        resolve(code);
      } catch (error) {
        server.close();
        reject(error);
      }
    });

    server.on("error", reject);
    server.listen(port, expectedUrl.hostname);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
