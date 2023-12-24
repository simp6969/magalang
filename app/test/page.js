const fs = require("fs");
const base64url = require("base64url");

// Function to encode a file to base64url
function encodeFileToBase64Url(filePath) {
  // Read the file as a Buffer
  const fileBuffer = fs.readFileSync(filePath);

  // Encode the Buffer to base64url
  const base64UrlString = base64url(fileBuffer);

  return base64UrlString;
}

// Function to decode a base64url string to a file
function decodeBase64UrlToFile(base64UrlString, outputPath) {
  // Decode the base64url string to a Buffer
  const decodedBuffer = base64url.toBuffer(base64UrlString);

  // Write the decoded Buffer to a file
  fs.writeFileSync(outputPath, decodedBuffer);

  return outputPath;
}

// Example usage
const inputFilePath = "./test.txt";
const outputFilePath = "./test.txt";

const base64UrlString = encodeFileToBase64Url(inputFilePath);
console.log("Encoded:", base64UrlString);

decodeBase64UrlToFile(base64UrlString, outputFilePath);
console.log("Decoded to file:", outputFilePath);
