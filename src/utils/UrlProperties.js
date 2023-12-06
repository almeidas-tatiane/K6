import { readFileSync } from 'k6/fs';

let properties = null;

// Property file path
const propertiesFilePath = 'resources/application.properties';

// Reading the property file content 
const fileContent = readFileSync(propertiesFilePath);

// Property parse
if (fileContent) {
    properties = parseProperties (fileContent)
} else {
    console.error(`Failed to read file: ${propertiesFilePath}`);
}

// Function to analyse the properties file
function parseProperties(content) {
    const properties = {};
    const lines = content.split('\n');
    for (const line of lines) {
        const [key, value] = line.split('=');
        if (key && value) {
            properties[key.trim()] = value.trim();
        }
    }
    return properties;
}

// Function to get URLs
export function urls(property) {
    const env = __ENV.env || 'default';  // Use 'default' if 'env'enviroment variable is not defined.

    // Build the property key 
    const key = `${env}.url.${property}`;

    // Getting the property value
    return properties[key];
}

// Example of use
// export default function () {
//     const url = urls('example');
//     console.log(`URL: ${url}`);
// }


// Command line to run the simulation using enviroment variable
//k6 run --env env=hlg meu_teste.js  // where hlg comes from application.properties file