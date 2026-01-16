const { Command } = require('commander');
const { log } = require('console');
const fs = require('fs');
const program = new Command();

program
.name('fileCLI')
.description('CLI to do file based tasks')
.version('1.0.0')

program.command('countWords')
.description('Count the no of word in file')
.argument('<file>', 'file to count')
.action((fileName) => {
     fs.readFile(fileName , "utf-8", function(err,data){
        if(err){
            console.log(err); 
        }
        else {
        const words =  data.split(' ').length;
        console.log(words)
        }
    })
})

program.command('countLines')
.description('Count the no of lines in file')
.argument('<file>', 'file to count')
.action((fileName) => {
     fs.readFile(fileName , "utf-8", function(err,data){
        if(err){
            console.log(err); 
        }
        else {
        const words =  data.split('\n').length;
        console.log(words)
        }
    })
})


program.parse();



// main(process.argv[2])
// function main(fileName){
//     console.log(process.argv);
// }



  //      let total =0;
        // for (let i=0;i<data.length;i++){
        //     if(data[i] ===" "){
        //         total++;
        //     }
        // }


    