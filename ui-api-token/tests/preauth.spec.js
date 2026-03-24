import { test, expect } from '@playwright/test';

test('Token pré-carregado no localStorage (Offline)', async ({ browser }) => {
  // 1️⃣ Cria o contexto do navegador
  const context = await browser.newContext();

  // 2️⃣ 👉 OPÇÃO B: injeta o token ANTES da página carregar
  await context.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, process.env.API_TOKEN);

  // 3️⃣ Agora cria a página (já com o script injetado)
  const page = await context.newPage();

  // 4️⃣ Navega ONLINE para garantir domínio válido
  await page.goto(process.env.BASE_URL, {
    waitUntil: 'domcontentloaded',
  });

  // (opcional, mas didático enquanto aprende)
  console.log('URL atual:', page.url());

  // 5️⃣ Só AGORA você ativa o offline
  await context.setOffline(true);

  // 6️⃣ Recarrega para simular uso offline
  await page.reload({ waitUntil: 'domcontentloaded' });

  // 7️⃣ Seus asserts
  // Exemplo:
  // await expect(page.locator('text=Token inválido')).toBeVisible();
});
