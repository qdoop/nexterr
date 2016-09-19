
var fs = require('fs');
var spawn = require('child_process').spawn;

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var vlog=vscode.window.showInformationMessage;

var vs=vscode;
var ws=vscode.workspace;
var wd=vscode.window;
var uri=vscode.Uri;

var zerrs= [];
var zerr = null;
var zcmd = null;
var zstamp = 0;

var zerrErrDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255,0,0,0.3)'
});

var zerrWrnDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(0,255,255,0.3)'
});


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "nexterr" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.nextError', function () {
        // The code you place here will be executed every time your command is executed
        if(!fs.existsSync(ws.rootPath + '/_next.json'))
        {
             fs.writeFileSync(ws.rootPath + '/_next.json','{}');
        }

        if(fs.existsSync(ws.rootPath + '/.next')) return;

        fs.mkdirSync(ws.rootPath + '/.next');
        fs.writeFileSync(ws.rootPath + '/.next/build.cmd','#this is your build shell script executed at top level folder.');
        // Display a message box to the user
        vscode.window.showInformationMessage('nextError extension loaded! Check inside .next folder');
    });

    context.subscriptions.push(disposable);

    function parseStdErr(txt, stamp)
    {
        var i=0;
        var line;

        var lines=txt.split('\n');
        // console.log(lines);
        for(i=0; i<lines.length; i++)
        {
            line=lines[i];
            if(-1==line.indexOf('error:') && -1==line.indexOf('warning:')) continue;

            var re=/^([^:]*)[:](\d+)[:](\d+)[:] (warning|error)[:] (.*)$/g;
            var ms=re.exec(line);
            // console.log(ms);
            if(null==ms || 6!=ms.length) continue;

            var x={};
            x.file=ms[1];
            x.line=Number(ms[2]);
            x.clmn=Number(ms[3]);
            x.kind=ms[4];
            x.text=ms[5];
            x.stamp=stamp;
            zerrs.push(x);
            // console.log(x);
        }

        return true;
    }


    function makeShowNextError(stamp0)
    {
        return function(){

            // console.log('showNextError', stamp0);

            if(zcmd) return;
            if(stamp0!=zstamp) return;
            if(zerrs.length<1) return;
            zerr=zerrs[0];
            zerrs.splice(0,1);

            ws.openTextDocument(ws.rootPath+'/'+zerr.file).then(function(doc){
                if(!doc) return;

                wd.showTextDocument(doc).then(function(editor){
                        if(!editor) return;
                        if(null==zerr) return;
                        var z=new vs.Range(zerr.line,0,zerr.line,zerr.clmn);
                        editor.revealRange(z);

                        var d={ range: new vs.Range(zerr.line-1,0,zerr.line-1,zerr.clmn), hoverMessage: zerr.text};
                        function decorate(){
                            editor.setDecorations(zerrErrDecorationType, [d]);
                        }
                        setTimeout(decorate, 1);

                        if('error'==zerr.kind)
                            wd.showErrorMessage(zerr.text).then(makeShowNextError(stamp0));
                        else
                            wd.showWarningMessage(zerr.text).then(makeShowNextError(stamp0));

                        // console.log('done');
                    });
                });
        };        

    }


    function saveListener(doc)
    {

        if(zcmd) return;
        if(!ws.rootPath) return;
        if(!fs.existsSync(ws.rootPath+'/.next/build.cmd')) return;

        var stamp=Date.now();
        zstamp=stamp;

        console.log('build stamp: ', stamp);

        zerrs=[];
        zerr=null;

        zcmd = spawn(ws.rootPath+'/.next/build.cmd', [],
            {
            cwd:ws.rootPath,
            shell:true
            });

        var disposable=wd.setStatusBarMessage('building project...');

        zcmd.stdout.on('data', function(data){
            // console.log(data.toString('utf8'));
        });

        zcmd.stderr.on('data', function(data){
            var txt=data.toString('utf8');
            // console.log('+++++');
            // console.log(txt);
            parseStdErr(txt, stamp);
            // console.log('-----');
        });

        zcmd.on('exit', function(code){
            zcmd=null;
            disposable.dispose();

            console.log('==========================================');

            if(0<zerrs.length)
            {
                var t = new Date( stamp );
                var formatted = t.toUTCString();
                wd.showInformationMessage('YOYR LATTEST BUILD ( '+ formatted +' ) has ' + zerrs.length + ' errors/warnings').then(makeShowNextError(stamp));
            }
        });
    }

    ws.onDidSaveTextDocument(saveListener);
    
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;