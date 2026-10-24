import { Logger } from "./logger.js";
import { ConsoleWriter } from "./logWriter.js";
import { FileWriter } from "./logWriter.js";



// Test 1: DEBUG — should print all four levels
console.log("\n===== DEBUG LEVEL =====");
const debugLogger = new Logger(4, new ConsoleWriter());

debugLogger.debug("Fetching user details");
debugLogger.info("User logged in");
debugLogger.warn("High CPU usage");
debugLogger.error("Database connection failed");

// Test 2: INFO — should print INFO, WARN, ERROR
console.log("\n===== INFO LEVEL =====");
const infoLogger = new Logger(3, new ConsoleWriter());

infoLogger.debug("This should NOT print");
infoLogger.info("User logged in");
infoLogger.warn("High CPU usage");
infoLogger.error("Database connection failed");

// Test 3: WARN — should print WARN, ERROR
console.log("\n===== WARN LEVEL =====");
const warnLogger = new Logger(2, new ConsoleWriter());

warnLogger.debug("This should NOT print");
warnLogger.info("This should NOT print");
warnLogger.warn("High CPU usage");
warnLogger.error("Database connection failed");

// Test 4: ERROR — should print ERROR only
console.log("\n===== ERROR LEVEL =====");
const errorLogger = new Logger(1, new ConsoleWriter());

errorLogger.debug("This should NOT print");
errorLogger.info("This should NOT print");
errorLogger.warn("This should NOT print");
errorLogger.error("Database connection failed");

// Test FileWriter
async function testFileWriter() {
    console.log("\n===== FILE WRITER TEST =====");

    const fileWriter = new FileWriter();

    // Your priority convention: ERROR=1, WARN=2, INFO=3, DEBUG=4
    const logger = new Logger(4, fileWriter);

    logger.info("User logged in");
    logger.warn("High CPU usage");
    logger.error("Database connection failed");

    // Wait for asynchronous writes if Logger doesn't await them internally.
    // Prefer making Logger methods await the writer to guarantee ordering.
}

testFileWriter().catch(console.error);