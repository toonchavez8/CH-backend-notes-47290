import { Command } from "commander";

const program = new Command();

program.option("-port <port>", "Server Port", null);
program.option("-persistence <persistence>", "persistencia: mongo", null);

program.parse();

export default program;
