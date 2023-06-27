import { OpenAIApi, ChatCompletionFunctions, CreateChatCompletionRequest, ChatCompletionResponseMessage } from 'openai';
type AnyZodObject = any;
type ToolImplementation = (a?: any) => Promise<Record<string, any>> | Record<string, any>;
type ToolDefenitionArgs = {
    name: string;
    purpose: string;
    argSchema?: AnyZodObject;
    implementation: ToolImplementation;
};
export declare class Tools {
    tools: ChatCompletionFunctions[];
    functions: Record<string, ToolImplementation>;
    constructor();
    addTool({ name, purpose: description, argSchema: schema, implementation, }: ToolDefenitionArgs): this;
}
type RunWithToolsUntilCompleteArgs = {
    api: OpenAIApi;
    prompt: string;
    tools: Tools;
} & Partial<Exclude<CreateChatCompletionRequest, 'functions' | 'function_call'>>;
export declare function runWithToolsUntilComplete({ api, prompt, tools, model, messages, ...opts }: RunWithToolsUntilCompleteArgs): Promise<{
    messages: import("openai").ChatCompletionRequestMessage[];
    lastMessage: ChatCompletionResponseMessage | undefined;
}>;
export declare function extractDataWithPrompt({ api, schema, prompt: content, metadataDescription: purpose, ...opts }: {
    api: OpenAIApi;
    schema: AnyZodObject;
    prompt: string;
    metadataDescription?: string;
} & Partial<Omit<CreateChatCompletionRequest, 'messages' | 'functions' | 'function_call'>>): Promise<{
    data: string | undefined;
    message: ChatCompletionResponseMessage;
}>;
export {};
