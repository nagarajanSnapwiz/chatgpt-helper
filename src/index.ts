import split2 from 'split2';
import { Readable } from 'stream';
import { OpenAI } from 'openai';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';

//TODO: have a strict type
type AnyZodObject = any;

export function getParameterFromZod(schema: AnyZodObject) {
  const {
    $schema: _$schema,
    //@ts-ignore
    additionalProperties: _additionalProps,
    ...jsonSchema
  } = zodToJsonSchema(schema);
  return jsonSchema;
}

export function createExtractor({
  purpose: description,
  schema,
}: {
  purpose: string;
  schema: AnyZodObject;
}): OpenAI.Chat.Completions.ChatCompletionCreateParams.Function {
  const parameters = getParameterFromZod(schema);
  return {
    name: 'metadata_extract',
    description,
    parameters,
  };
}

type ToolImplementation = (
  a?: any
) => Promise<Record<string, any>> | Record<string, any>;

type ToolDefenitionArgs = {
  name: string;
  purpose: string;
  argSchema?: AnyZodObject;
  implementation: ToolImplementation;
};

export class Tools {
  tools: OpenAI.Chat.Completions.ChatCompletionCreateParams.Function[];
  functions: Record<string, ToolImplementation>;

  constructor() {
    this.tools = [];
    this.functions = {};
  }

  addTool({
    name,
    purpose: description,
    argSchema: schema = z.object({}),
    implementation,
  }: ToolDefenitionArgs) {
    this.functions[name] = implementation;
    const parameters = getParameterFromZod(schema);
    this.tools.push({
      name,
      description,
      parameters,
    });
    return this;
  }
}

type RunWithToolsUntilCompleteArgs = {
  api: OpenAI;
  prompt: string;
  tools: Tools;
} & Partial<
  Exclude<
    OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
    'functions' | 'function_call'
  >
>;

const DEFAULT_MODEL = 'gpt-3.5-turbo-0613';

export async function runWithToolsUntilComplete({
  api,
  prompt,
  tools,
  model = DEFAULT_MODEL,
  messages = [],
  ...opts
}: RunWithToolsUntilCompleteArgs) {
  let complete = false;
  messages = [...messages, { role: 'user', content: prompt }];
  let lastMessage: OpenAI.Chat.Completions.ChatCompletionMessage | undefined =
    undefined;
  while (!complete) {
    const chatCompletion = await api.chat.completions.create({
      model,
      messages,
      functions: tools.tools,
      function_call: 'auto',
      ...opts,
    });

    const { message } = chatCompletion.choices?.[0];
    lastMessage = message;
    if (message) {
      messages = [...messages, message];
      if (message.function_call) {
        const { name: functionName, arguments: _args = '{}' } =
          message.function_call;
        const functionArgument: Record<string, any> = JSON.parse(_args);
        const functionResult = await tools.functions[functionName!](
          functionArgument
        );
        messages = [
          ...messages,
          {
            role: 'function',
            name: functionName,
            content: JSON.stringify(functionResult),
          },
        ];
      } else {
        complete = true;
      }
    } else {
      throw new Error('MessageResponseEmpty');
    }
  }
  return { messages, lastMessage };
}

export async function extractDataWithPrompt({
  api,
  schema,
  prompt: content,
  metadataDescription: purpose = '',
  ...opts
}: {
  api: OpenAI;
  schema: AnyZodObject;
  prompt: string;
  metadataDescription?: string;
} & Partial<
  Omit<
    OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
    'messages' | 'functions' | 'function_call'
  >
>) {
  const fn = createExtractor({ purpose, schema });
  const { model = DEFAULT_MODEL, ...otherOpts } = opts;
  const chatCompletion = await api.chat.completions.create({
    model,
    messages: [{ role: 'user', content }],
    functions: [fn],
    function_call: { name: fn.name },
    ...otherOpts,
  });
  if (chatCompletion.choices?.[0]?.message?.function_call) {
    const { message } = chatCompletion.choices?.[0];
    return { data: message!.function_call!.arguments, message };
  } else {
    throw new Error('ResultEmpty');
  }
}

export async function extractStreamWithPrompt({
  api,
  schema,
  prompt: content,
  metadataDescription: purpose = '',
  ...opts
}: {
  api: OpenAI;
  schema: AnyZodObject;
  prompt: string;
  metadataDescription?: string;
} & Partial<
  Omit<
    OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming,
    'messages' | 'functions' | 'function_call'
  >
>) {
  const fn = createExtractor({ purpose, schema });
  const { model = DEFAULT_MODEL, ...otherOpts } = opts;
  const chatCompletion = await api.chat.completions.create({
    model,
    messages: [{ role: 'user', content }],
    functions: [fn],
    function_call: { name: fn.name },
    ...otherOpts,
    stream: true,
  });
  //@ts-ignore
  return chatCompletion.data.pipe(
    split2((line) => {
      if (
        line?.trim() &&
        !line.includes('[DONE]') &&
        line.startsWith('data: ')
      ) {
        const chunkJson = line.replace('data: ', '');
        const obj = JSON.parse(chunkJson);
        return obj?.choices?.[0]?.delta?.function_call?.arguments || '';
      }
    })
  ) as Readable;
}
