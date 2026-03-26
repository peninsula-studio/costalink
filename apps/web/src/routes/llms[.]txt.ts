// src/routes/llms[.]txt.ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const content = `# CostaLink

> CostaLink is a platform for Real Estate agents to share their direct properties and collaborate

## Key Facts
- Platform to share properties between Real Estate agents in the coast of Spain
- Only direct properties from Real Estate agents

## Documentation
- Getting Started: https://myapp.com/docs/getting-started

## Contact
- Website: https://costalink.com
- Email: jorge@peninsula.studio
`;

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      },
    },
  },
});
