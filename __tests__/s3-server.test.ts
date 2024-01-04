import { Readable } from 'stream';
import { GetObjectCommand } from "@aws-sdk/client-s3";
// import { s3Client } from "@/s3-client";
import { downloadFromS3 } from '../lib/s3-server';

jest.mock("@/s3-client", () => ({
  send: jest.fn().mockImplementation((command) => {
    if (command instanceof GetObjectCommand) {
      const mockStream = new Readable();
      mockStream.push('mock data');
      mockStream.push(null);
      return Promise.resolve({ Body: mockStream });
    }
  }),
}));

describe('downloadFromS3', () => {
  it('should download file from S3', async () => {
    const file_key = 'test-key';
    const file_name = await downloadFromS3(file_key);
    expect(file_name).toContain('/tmp/pdf-');
    // Add more assertions as needed
  });
});