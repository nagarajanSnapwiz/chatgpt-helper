# ChatGPT Helper

A thin layer of abstraction over chatGPT chat completion api and its function calling capabilities

## Features

- Use _[Zod](https://zod.dev/)_ schema to define the structure of the output
- Create automatic agents for chatGPT in a very simple way
- Nice abstraction over chatGPT function calling flow

## Getting Started

```
npm i chatgpt-helper zod openai
```

## usage

The library provides two ways to interact with ChatGPT

1. `extractDataWithPrompt` - extract structured data using a schema and prompt (simple way)

```typescript
import { extractDataWithPrompt } from 'chatgpt-helper';
import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';

const api = new OpenAIApi(
  new Configuration({
    apiKey: '<openai key>',
  })
);

//Zod schema describing the way we want the data to be structured
const movieSchema = z.object({
  name: z.string().describe('Name of the movie'), //describe method provides way to provide hints to chatGPT
  year: z.number().describe('Year the movie came out'),
  cast: z
    .array(
      z.object({
        name: z.string().describe('Name of the actor'),
        character: z
          .string()
          .describe('Name of the character the actor played'),
      })
    )
    .describe('List of cast members sorted by their runtime'),
  genres: z.array(z.string()).describe('List of genres associated with'),
  runTime: z.string().describe('Runtime of the movie'),
});

extractDataWithPrompt({
  api: api,
  prompt: `Details of movie Big Fish`,
  schema: movieSchema,
}).then(({ data }) => {
  console.log(JSON.parse(data));
});

// Output
// {
//   "name": "Big Fish",
//   "year": 2003,
//   "cast": [
//     {
//       "name": "Ewan McGregor",
//       "character": "Edward Bloom (Young)"
//     },
//     {
//       "name": "Albert Finney",
//       "character": "Edward Bloom (Senior)"
//     },
//     {
//       "name": "Billy Crudup",
//       "character": "Will Bloom"
//     },
//     {
//       "name": "Jessica Lange",
//       "character": "Sandra Bloom"
//     },
//     {
//       "name": "Helena Bonham Carter",
//       "character": "Jenny (Young) / The Witch"
//     }
//   ],
//   "genres": [
//     "Adventure",
//     "Drama",
//     "Fantasy"
//   ],
//   "runTime": "2h 5min"
// }
```

2. `runWithToolsUntilComplete` - create plugins for chatGPT on demand and allow chatGPT to call necessary tool as needed

> :warning: **Be very careful on using this**: With this utility you are putting chatGPT **in charge** of calling the custom tools you provide.

```typescript
import { Tools, runWithToolsUntilComplete } from 'chatgpt-helper';
import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';

const api = new OpenAIApi(
  new Configuration({
    apiKey: '<openai key>',
  })
);

//Need to create zod schema if arguments needed for the tool
const timeForFoodSchema = z.object({
  name: z.string().describe('name of the food item'),
});

//Tool definitions and implementations
const tools = new Tools()
  .addTool({
    name: 'currentTime',
    purpose: 'Getting the current time',
    implementation: () => {
      return { currentTime: new Date().toLocaleTimeString() };
    },
  })
  .addTool({
    name: 'timeForFood',
    purpose:
      'Gives an approximate time taken for food to be ready when ordered in a hotel',
    argSchema: timeForFoodSchema,
    implementation: (arg: z.infer<typeof timeForFoodSchema>) => {
      return { time: '30', unit: 'minutes' };
    },
  });

runWithToolsUntilComplete({
  api: api,
  prompt:
    'I am Planning to have pizza from my favourite restaurant now. By what time that pizza would be completely digested?',
  tools,
}).then((r) => {
  console.log(r.lastMessage);
});

//Output

// {
//  role: 'assistant',
//  content: 'If you order pizza now, it will take approximately 30 minutes for the pizza to be ready. So, by 1:03 AM, the pizza should be completely digested. Please note that digestion time can vary depending on various factors such as metabolism, individual health conditions, and other factors.'
//   }

```
