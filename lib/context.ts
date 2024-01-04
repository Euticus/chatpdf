import { getEmbeddings } from "./embeddings";
import { getPineconeClient } from "./pinecone";


export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
    const client = await getPineconeClient();
    const index = await client.Index("chatpdf");

    try {
        const queryResult = await index.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
            filter: {
                    fileKey: fileKey,
            }
        });

        console.log("QUERY QUERY QUERY", queryResult);
        console.log("MATCHES MATCHES MATCHES", queryResult.matches);
        return queryResult.matches || [];
    } catch (error) {
        console.log('error querying embeddings', error);
        throw error;
    }
}


export async function getContext(query: string, fileKey: string) {
    console.log("inside getContext, hitting right before getEmbedings")
    const queryEmbeddings =  await getEmbeddings(query)
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey)

    const qualifyingDocs = matches.filter(
        (match) => match.score && match.score > 0.7
    )

    type Metadata = {
        text: string, 
        pageNumber: number, 
        fileKey: string
    }

    let docs = qualifyingDocs.map(match => (match.metadata as Metadata).text)
    // 5 vectors per page
    return docs.join('\n').substring(0, 3000)

}