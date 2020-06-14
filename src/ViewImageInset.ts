import * as vscode from 'vscode';

export default class ViewImageInset {
	public inset : vscode.WebviewEditorInset | undefined;
	public workingdir: vscode.Uri;

	public constructor(workingdir :vscode.Uri)
	{
		this.workingdir = workingdir;
	}



	public async InsetImage(path: string | undefined,  activeEditor: vscode.TextEditor | undefined) {
		if (path === undefined) {
			return;
		} 

		if (activeEditor === undefined) {
			return;
		}

		// Clear previus inset
		if(this.inset !== undefined) {
			this.inset.dispose();
		}

		this.inset = vscode.window.createWebviewTextEditorInset(
			activeEditor,  5, 10,
			{ localResourceRoots: [ this.workingdir ] }
			);
	
		this.inset.onDidDispose(() => {
			console.log('WEBVIEW disposed...');
		});

		const png = vscode.Uri.parse( `vscode-resource:${path}`).toString()
		this.inset.webview.html =   getHtml(path);
	}

	
}

function getHtml(path: string) {
    const png = path;
    return `<img src="vscode-resource:${png}"/>`
}