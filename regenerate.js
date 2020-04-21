const { exec } = require("child_process");
const { writeFile } = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const processName =
	process.platform === "win32" ? "code-insiders.cmd" : "code-insiders";
const command = `${processName} --list-extensions`;

(async () => {
	const { stdout } = await promisify(exec)(command);
	const extensionPack = stdout
		.trim()
		.split("\n")
		.filter((e) => !/nicholasadamou.vscode-extension-pack/.test(e));

	await promisify(writeFile)(
		join(__dirname, "package.json"),
		`${JSON.stringify(
			{ ...require("./package.json"), extensionPack },
			null,
			2
		)}\n`
	);
})();
