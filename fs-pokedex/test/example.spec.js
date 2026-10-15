import { test, describe, expect } from '@playwright/test'
describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.route('https://pokeapi.co/api/v2/pokemon/?limit=50', route =>
      route.fulfill({
        json: {
          results: [
            {
              name: 'ivysaur',
              url: 'https://pokeapi.co/api/v2/pokemon/2/'
            }
          ]
        }
      })
    )

    await page.goto('/')

    await expect(page.getByText('Ivysaur')).toBeVisible()

    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.'
      )
    ).toBeVisible()
  })
})
