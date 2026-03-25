import { test, expect } from '@playwright/test';

test('Token pré-carregado no localStorage (Offline)', async ({ browser }) => {

  // 1️⃣ Cria o contexto do navegador
  const context = await browser.newContext();

  // 2️⃣ (se você usa token) injeta antes da página abrir
  await context.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, process.env.API_TOKEN);

  // 3️⃣ Cria a página
  const page = await context.newPage();

  // ✅ 4️⃣ AQUI É O LUGAR DO page.goto
  await page.goto(process.env.BASE_URL);

  // 5️⃣ A partir daqui vêm interações e asserts
  // ex:
  // await expect(page.locator('text=Bem-vindo')).toBeVisible();
});
