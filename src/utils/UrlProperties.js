// Property file path
const propertiesFilePath = 'resources/application.properties';

// Reading the property file content
export function readPropertiesFile(propertiesFilePath) {
    const file = open(propertiesFilePath);
    const content = read(file);
    file.close();
    return content;
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

export function getUrl(propertiesFilePath) {
    return properties
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