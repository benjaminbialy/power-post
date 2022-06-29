## Set Up

to install all dependencies

```
npm i
```

create a .env file and put:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=

with their respective keys.

## To run

```bash
npm run dev
# or
yarn dev
```

## Tech Stack

This is a Next.js App using TailwindCSS for styling

We'll also be using Node.js through Next.js's inbuilt server accessible by requesting from
pages/api/{endpoint}

Use axios to create requests to each end point.
