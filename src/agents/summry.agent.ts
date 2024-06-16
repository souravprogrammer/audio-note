import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";



export const parser = StructuredOutputParser.fromNamesAndDescriptions({
    title: "title of the summary",
    summary: "consise and make it clear easy to understandable summary of the my speach/notes",
});
export const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
        "Summeriez  my Speach or notes as best as possible.\n{format_instructions}\n{question}"
    ),
    new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
    }),
    parser,
]);

export async function generateNoteSummery(question: string) {
    return chain.invoke({
        question: question, format_instructions: parser.getFormatInstructions(),
    });


}