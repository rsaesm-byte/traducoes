# Ricardo Saes · Translations — Invoice Generator

Gerador de invoices de tradução, com histórico mensal, sincronização entre dispositivos e link de relatório para o cliente.

- **Versão web:** https://rsaesm-byte.github.io/traducoes/ (pode ser instalada como app no Chrome/Edge)
- **Versão desktop:** `invoice-traducao.html` (funciona offline, salva no arquivo `invoice-dados.json` do PC)
- **Relatório para o cliente:** `relatorio.html#<id>`. O link é gerado no app pelo botão **Link do relatório**. Por esse link o cliente vê o invoice, salva em PDF ou Excel e confirma o pagamento.

## Sincronização

Usa um GitHub Gist privado com o token do próprio usuário (somente o escopo `gist`). O token fica salvo só no navegador de cada aparelho e nunca entra no repositório.

## Avisos de pagamento

Quando o cliente confirma, o aviso vai para um tópico secreto do [ntfy.sh](https://ntfy.sh). Assine esse tópico no app ntfy do celular para receber as notificações.

## Atualizar

1. Ao alterar o `index.html`, aumente `APP_VERSION` no código e o valor em `version.json`.
2. Aumente `VERSAO` no `sw.js`.

O botão **⟳ Atualizar** do app sincroniza os dados e avisa quando houver uma versão nova.
