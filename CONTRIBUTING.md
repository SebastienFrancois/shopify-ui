# Contribuer

Merci de votre interet pour Shopify UI Components !

## Comment contribuer

1. Forkez le repo
2. Creez une branche (`git checkout -b feat/mon-composant`)
3. Commitez vos changements (`git commit -m 'feat: add mon-composant'`)
4. Poussez vers la branche (`git push origin feat/mon-composant`)
5. Ouvrez une Pull Request

## Conventions

### Commits

Suivez [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` nouvelle fonctionnalite
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage
- `refactor:` refactoring
- `test:` ajout/modification de tests

### Code

- TypeScript strict
- Pas de dependances runtime
- Chaque composant doit avoir : `.ts`, `.styles.ts`, `.stories.ts`, `.test.ts`
- Utilisez `BaseElement` comme classe de base
- Exposez `::part()` pour le styling externe
- Respectez l'accessibilite (ARIA, clavier, contraste)

### Tests

```bash
just test
```

Tous les tests doivent passer avant de soumettre une PR.

## Ajouter un nouveau composant

```bash
just generate mon-composant
```

Puis implementez la logique, les styles, les stories et les tests.
