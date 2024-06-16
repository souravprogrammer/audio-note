import Groq from "groq-sdk"

export const ROLES = {
    system: "system",
    user: "user",
    assistance: "assistance",
}
type AgentOptions = {
    role: string,
    goal: string,
    llm: Groq
    output: string

}
export class Agent {

    messages: Groq.Chat.Completions.CompletionCreateParams.Message[]
    constructor(private readonly options: AgentOptions) {

        const message = [
            // {
            //     role: ROLES.system,
            //     content: `
            //     YOUR ROLE INSTRUCTION
            //     your role is going to be a ${options.role}
            //     strickely follow this role, don't provied a result outside of your role
            //     do your best to perform your role specfic task
            //     YOUR ROLE INSTRUCTION END

            //     `
            // },
            {
                role: ROLES.system,
                content: `
                ${options.goal}
                `
                // content: `
                // YOUR GOAL INSTRUCTION
                // your goal is to produce ${options.goal}
                // YOUR GOAL INSTRUCTION END
                // `
            },
            // {
            //     role: ROLES.system,
            //     content: `
            //     Answer the users question as best as possible.
            //     You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

            //     "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

            //     For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
            //     would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
            //     Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

            //     Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

            //     Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
            //     '''
            //     { "type": "object", "properties": { "answer": { "type": "string", "description": "answer to the user's question" }, "sources": { "type": "array", "items": { "type": "string" }, "description": "sources used to answer the question, should be websites." } }, "required": ["answer", "sources"], "additionalProperties": false, "$schema": "http://json-schema.org/draft-07/schema#" }
            //     '''
            //     `
            // }
        ]

        this.messages = message


    }

    async execute(input: any) {

        const userInput = {
            role: ROLES.user,
            content: `
            ${input}
            `
        }
        return await this.options.llm.chat.completions.create({
            messages: [...this.messages, userInput],
            // model: "llama3-8b-8192",

            model: "mixtral-8x7b-32768",


        })
    }

}

export class Task {

}

