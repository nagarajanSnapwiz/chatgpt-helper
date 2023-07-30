/// <reference types="node" />
import { Readable } from 'stream';
import { OpenAIApi, ChatCompletionFunctions, CreateChatCompletionRequest, ChatCompletionResponseMessage } from 'openai';
type AnyZodObject = any;
export declare function getParameterFromZod(schema: AnyZodObject): {
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "string";
    minLength?: number | undefined;
    maxLength?: number | undefined;
    format?: "email" | "uri" | "uuid" | "date-time" | "ipv4" | "ipv6" | undefined;
    pattern?: string | undefined;
    allOf?: {
        pattern: string;
        errorMessage?: Partial<Omit<{
            pattern: string;
        }, "" | "type" | "errorMessages">> | undefined;
    }[] | undefined;
    anyOf?: {
        format: string;
        errorMessage?: Partial<Omit<{
            format: string;
        }, "" | "type" | "errorMessages">> | undefined;
    }[] | undefined;
    errorMessage?: Partial<Omit<{
        type: string;
        minLength?: string | undefined;
        maxLength?: string | undefined;
        format?: string | undefined;
        pattern?: string | undefined;
        allOf?: string | undefined;
        anyOf?: string | undefined;
        errorMessage?: string | undefined;
    }, "" | "type" | "errorMessages">> | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "array";
    items?: import("zod-to-json-schema/src/parseDef").JsonSchema7Type | undefined;
    minItems?: number | undefined;
    maxItems?: number | undefined;
    errorMessages?: Partial<Omit<{
        type: string;
        items?: string | undefined;
        minItems?: string | undefined;
        maxItems?: string | undefined;
        errorMessages?: string | undefined;
    }, "type" | "items" | "errorMessages">> | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "number" | "integer";
    minimum?: number | undefined;
    exclusiveMinimum?: number | undefined;
    maximum?: number | undefined;
    exclusiveMaximum?: number | undefined;
    multipleOf?: number | undefined;
    errorMessage?: Partial<Omit<{
        type: string;
        minimum?: string | undefined;
        exclusiveMinimum?: string | undefined;
        maximum?: string | undefined;
        exclusiveMaximum?: string | undefined;
        multipleOf?: string | undefined;
        errorMessage?: string | undefined;
    }, "" | "type" | "errorMessages">> | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "integer";
    format: "int64";
    minimum?: BigInt | undefined;
    exclusiveMinimum?: BigInt | undefined;
    maximum?: BigInt | undefined;
    exclusiveMaximum?: BigInt | undefined;
    multipleOf?: BigInt | undefined;
    errorMessage?: Partial<Omit<{
        type: string;
        format: string;
        minimum?: string | undefined;
        exclusiveMinimum?: string | undefined;
        maximum?: string | undefined;
        exclusiveMaximum?: string | undefined;
        multipleOf?: string | undefined;
        errorMessage?: string | undefined;
    }, "" | "type" | "errorMessages">> | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "boolean";
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "string";
    format: "date-time";
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "string";
    enum: string[];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "string" | "number" | "boolean" | "integer";
    const: string | number | boolean;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "object" | "array";
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "string" | "number" | ["string", "number"];
    enum: (string | number)[];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "null";
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "object";
    properties: Record<string, import("zod-to-json-schema/src/parseDef").JsonSchema7Type>;
    required?: string[] | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "object";
    propertyNames?: (Omit<import("zod-to-json-schema/src/parsers/string").JsonSchema7StringType, "type"> | Omit<import("zod-to-json-schema/src/parsers/enum").JsonSchema7EnumType, "type">) | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "array";
    minItems: number;
    items: import("zod-to-json-schema/src/parseDef").JsonSchema7Type[];
    maxItems: number;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "array";
    minItems: number;
    items: import("zod-to-json-schema/src/parseDef").JsonSchema7Type[];
    additionalItems?: import("zod-to-json-schema/src/parseDef").JsonSchema7Type | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: ("string" | "number" | "boolean" | "integer" | "null") | ("string" | "number" | "boolean" | "integer" | "null")[];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: ("string" | "number" | "boolean" | "integer" | "null") | ("string" | "number" | "boolean" | "integer" | "null")[];
    enum: (string | number | bigint | boolean | null)[];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    anyOf: import("zod-to-json-schema/src/parseDef").JsonSchema7Type[];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    not: {};
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    $ref: string;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    not: {};
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "array";
    maxItems: 125;
    items: {
        type: "array";
        items: [import("zod-to-json-schema/src/parseDef").JsonSchema7Type, import("zod-to-json-schema/src/parseDef").JsonSchema7Type];
        minItems: 2;
        maxItems: 2;
    };
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    anyOf: [import("zod-to-json-schema/src/parseDef").JsonSchema7Type, import("zod-to-json-schema/src/parsers/null").JsonSchema7NullType];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: [string, "null"];
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    allOf: import("zod-to-json-schema/src/parseDef").JsonSchema7Type[];
    unevaluatedProperties?: boolean | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
} | {
    type: "array";
    uniqueItems: true;
    items?: import("zod-to-json-schema/src/parseDef").JsonSchema7Type | undefined;
    minItems?: number | undefined;
    maxItems?: number | undefined;
    errorMessage?: Partial<Omit<{
        type: string;
        uniqueItems: string;
        items?: string | undefined;
        minItems?: string | undefined;
        maxItems?: string | undefined;
        errorMessage?: string | undefined;
    }, "" | "type" | "errorMessages">> | undefined;
    default?: any;
    description?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema/src/parseDef").JsonSchema7Type;
    } | undefined;
};
export declare function createExtractor({ purpose: description, schema, }: {
    purpose: string;
    schema: AnyZodObject;
}): ChatCompletionFunctions;
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
export declare function extractStreamWithPrompt({ api, schema, prompt: content, metadataDescription: purpose, ...opts }: {
    api: OpenAIApi;
    schema: AnyZodObject;
    prompt: string;
    metadataDescription?: string;
} & Partial<Omit<CreateChatCompletionRequest, 'messages' | 'functions' | 'function_call'>>): Promise<Readable>;
export {};
