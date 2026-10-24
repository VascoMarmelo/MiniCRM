#We'll use Hono for a clean API routing layer, Zod for validation, and Bun's native SQLite driver. This is a lightweight alternative to bringing in a full ORM.
bun add @hono/zod-validator hono zod
bun add -d @types/bun typescript