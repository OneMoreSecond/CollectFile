// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getWorkspaceKey()
{
	if (vscode.workspace.workspaceFile !== undefined)
	{
		return vscode.workspace.workspaceFile.toString();
	}
	else if (vscode.workspace.workspaceFolders !== undefined)
	{
		return vscode.workspace.workspaceFolders[0].name;
	}
	else
	{
		return 'Untitled';
	}
}

let workspaceKey: string | undefined = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "collectfile" is now activated.');

	let workspaceFileMap = context.globalState.get<Map<string, string | null>>('workspaceFileMap');
	if (workspaceFileMap === undefined)
	{
		workspaceFileMap = new Map();
	}

	workspaceKey = getWorkspaceKey();
	if (workspaceFileMap.has(workspaceKey))
	{
		// ignore duplicated keys
		workspaceKey = undefined;
	}
	else
	{
		if (context.extensionMode === vscode.ExtensionMode.Development)
		{
			console.log('workspace key ' + workspaceKey + ' is added');
		}
		workspaceFileMap.set(workspaceKey, null);
		context.globalState.update('workspaceFileMap', workspaceFileMap).then();
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('collectfile.collect', async () =>
	{
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from CollectFile!');

		await collectIsolatedFiles();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate()
{
	;
}

async function collectIsolatedFiles()
{
	// const newWindow = await vscode.commands.executeCommand('workbench.action.newWindow');
	// console.log(newWindow);
}
