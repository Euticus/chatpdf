// pinecone.test.ts

import { loadS3IntoPinecone, prepareDocument, embedDocument } from '../lib/pinecone'
import { downloadFromS3 } from '../lib/s3-server'
import { mocked } from 'jest-mock'


// describe('loadS3IntoPinecone', () => {
//   it('should process a file from S3 and load it into Pinecone', async () => {
//       const mockDownloadFromS3 = jest.fn().mockResolvedValue('fake-file-path');
//       mocked(downloadFromS3).mockImplementation(mockDownloadFromS3);
//       //it's saying mockImplementation is not a function
//       // Mock other dependencies as needed

//       const fileKey = 'test-file-key';
//       await loadS3IntoPinecone(fileKey);
//   })
// })

describe('loadS3IntoPinecone', () => {
  it('should process a file from S3 and load it into Pinecone', async () => {
      jest.mock('../lib/s3-server');
      const { downloadFromS3 } = require('../lib/s3-server');
      const mockDownloadFromS3 = jest.fn().mockResolvedValue('fake-file-path');
      downloadFromS3.mockImplementation(mockDownloadFromS3);

      const fileKey = 'test-file-key';
      await loadS3IntoPinecone(fileKey);
  });
});


describe('prepareDocument', () => {
  it('should split a pdf into documents', async () => {
      const page = {
          pageContent: 'this is a test',
          metadata: {
              loc: { pageNumber: 1 }
          }
      }
      const fileKey = 'test-file-key';
      const documents = await prepareDocument(page, fileKey)
      expect(documents.length).toBe(1)
  })
})

describe('embedDocument', () => {
  it('should embed a document', async () => {
      const page = {
          pageContent: 'this is a test',
          metadata: {
              loc: { pageNumber: 1 }
          }
      }
      const fileKey = 'test-file-key';
      const documents = await prepareDocument(page, fileKey)
      const embeddings = await embedDocument(documents[0], fileKey)
      expect(embeddings).toBeDefined()
  })
})

describe('loadS3IntoPinecone', () => {
  it('should process a file from S3 and load it into Pinecone', async () => {
      const mockDownloadFromS3 = jest.fn().mockResolvedValue('fake-file-path');
      mocked(downloadFromS3).mockImplementation(mockDownloadFromS3);

      // Mock other dependencies as needed

      const fileKey = 'test-file-key';
      await loadS3IntoPinecone(fileKey);
  })
})

// 5. query pinecone for similar documents
// 6. return the similar documents
// 7. display the similar documents to the user
// 8. allow the user to select the document they want to view
// 9. display the document to the user
// 10. allow the user to select text from the document
// 11. allow the user to highlight text from the document
// 12. allow the user to add comments to the document
// 13. allow the user to add annotations to the document
// 14. allow the user to add a signature to the document
// 15. allow the user to add a signature to the document
// 16. allow the user to download the document