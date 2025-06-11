# 🗣️ AWS Polly Text-to-Speech (AWS Lambda + S3)

This project demonstrates how to convert plain text into lifelike speech using **Amazon Polly**, and store the resulting `.mp3` audio file in an **Amazon S3** bucket via **AWS Lambda**. This is ideal for building audio readers, newsletter narrators, or accessibility tools.

---

## 📐 Architecture Diagram

The overall system design includes four core AWS services: Lambda, Polly, S3, and IAM for permissions.

![Architecture Diagram](https://github.com/Yuehan07/polly-text-to-speec/blob/main/Architectural%20Diagram.png)

---

## 🧪 Lambda Execution & Test Results

### ✅ Code Output Logs

Shows successful synthesis and S3 upload operation.

![Code Output](https://github.com/Yuehan07/polly-text-to-speec/blob/main/code_output.png)

---

### 📤 Lambda Test Input & Output

Illustrates how the text event is received and processed by the function.

![Test Output](https://github.com/Yuehan07/polly-text-to-speec/blob/main/test_output.png)

## 📁 Project Files

| File                    | Description                                                            |
|-------------------------|------------------------------------------------------------------------|
| `index.mjs`             | The main Lambda function using `@aws-sdk` to call Polly and store audio in S3 |
| `Architectural Diagram.png` | AWS services architecture diagram                                  |
| `code_output.png`       | Screenshot of Lambda log output after success                          |
| `test_output.png`       | Screenshot of Lambda test event and its response                       |

## 📝 Technical Notes

- ✅ Uses **ES Module** syntax (`import` instead of `require`)
- ✅ Requires **Node.js 18.x** Lambda runtime or newer
- ✅ Polly voice is set to **"Joanna"**, and output format is **"mp3"**
- 🧠 Ensure **S3 bucket and Lambda are in the same region** (e.g., `us-east-1`)
- 🎯 Uploads are streamed efficiently using `@aws-sdk/lib-storage`'s `Upload` class


## 🧰 How to Deploy

1. **Create an S3 Bucket**  
   Make sure the name is DNS-compliant (e.g. `polly-audio-storage`) and in the same region as Lambda (e.g. `us-east-1`).

2. **Create an IAM Role for Lambda**  
   Attach policies: `AWSLambdaBasicExecutionRole` + a custom policy for S3 and Polly (see below).

3. **Deploy Lambda Function**  
   - Runtime: Node.js 18.x  
   - Handler: `index.handler` (if using `.mjs` file, change appropriately)
   - Upload the `index.mjs` file and set environment if needed.

4. **Replace Bucket Name**  
   In the code, change this line:
   ```js
   Bucket: "your-real-s3-bucket-name",

## 🧪 Test with Sample Event

Use the following JSON as your test event when invoking the Lambda function:

```json
{
  "text": "This is a demo to convert text to audio using Amazon Polly."
}

