# Commands
- Build: `pnpm run build`
- Lint: `pnpm run lint`
- Format: `pnpm run format`
- Check: `pnpm run check`
- Test: `pnpm run test`
- Test single: `vitest run <file>`

# Code Style
- **Formatting**: Biome, 2 space indentation, double quotes, semicolon
- **Imports**: Organize with Biome, path aliases `@/` for `src/`
- **Types**: Strict TypeScript, no unused locals/parameters
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error handling**: Zod schemas for validation, console.log for debugging
- **UI**: Shadcn components via `pnpm dlx shadcn@latest add <component>`
- **Styling**: Tailwind CSS with `cn()` utility for class merging
- **Libraries**: TanStack (Router, Query), React 19, lucide-react
