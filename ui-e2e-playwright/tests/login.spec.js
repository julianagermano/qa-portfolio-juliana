const { test, expect } = require('@playwright/test');

test('Login válido direciona para a home', async ({ page }) => {

  // URL genérica de demonstração (pode ser qualquer site fictício)
  await page.goto('https://ui-example-login.netlify.app/');

  await page.fill('#username', 'usuario_teste');
  await page.fill('#password', 'senha_teste');

  await page.click('#login-btn');

  // Validação genérica
  await expect(page).toHaveURL(/.*home/);
  await expect(page.locator('h1')).toContainText('Bem-vindo');
});
