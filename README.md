# K6
In this repository you will find some projects in K6 developed during my learning curve.

### **K6 Installation**
- K6 Documentation: https://grafana.com/docs/k6/latest/get-started/installation/

### 📂**Project structure in Visual Studio Code**
![image](https://github.com/almeidas-tatiane/K6/assets/68197687/57b04897-2322-4df9-8b34-9c0368dfdca2)

- In the requests folder, you'll find the project class with methods that will be called in the simulations;
- In the simulations folder, you'll find different types of performance testing;
- In the data folder, you'll find csv and json files used for script parametrization;
- In the resources folder, you'll find the application.properties file that has all URLs used and it can be used in multiple environments as: HLG, PROD, DEV etc;
- In the utils folder, you'll find the urlProperties.js file, it's used to read the application.properties, with the urlProperties file you can pass the variable environment in the command line during script execution;
- The buildspec.yml is used with simulations -> crocodiles_LoadTest_AWS.js, to run the simulation in the AWS with codeBuild;
- In the reports folder, you'll find the HTML report of execution.


### **Steps to execute the simulation**
- In your terminal, go to path: K6\src\crocodiles\simulations;
- Type: k6 run -e env=hlg crocodiles_SmokeTest.js and press ENTER key;
- The value hlg used in the command line came from application.properties file, from the struture **hlg**.url.api

