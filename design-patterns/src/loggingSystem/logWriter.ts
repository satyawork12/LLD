import { writeFile } from "fs/promises"



export interface LogWriter {
    write(message: String): void;

}

class ConsoleWriter implements LogWriter {
    write(message: String): void {
        console.log(message)
    }
}

class FileWriter implements LogWriter {
    async write(message: String): Promise<void> {
        const filePath = "./loggerFile.txt";
        try {
            await writeFile(filePath, message);
            console.log('File written successfully!');
        } catch (error) {
            console.error('Error writing to file:', error);
        }


    }
}