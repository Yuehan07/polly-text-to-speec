import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const polly = new PollyClient({});
const s3 = new S3Client({});

export const handler = async (event) => {
  try {
    const text = event.text;

    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Joanna",
    };

    const command = new SynthesizeSpeechCommand(params);
    const data = await polly.send(command);

    const key = `audio-${Date.now()}.mp3`;

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: "olivia-polly-audio-files-storages", // Replace with your bucket name
        Key: key,
        Body: data.AudioStream,
        ContentType: "audio/mpeg",
      },
    });

    await upload.done();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Audio file stored as ${key}` }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
