const {app,BrowserWindow,ipcMain}=require("electron");
const path=require("path");
const fs=require("fs");
let mainWindow;

function createWindow(){
  mainWindow=new BrowserWindow({
    width:800,height:600,
    webPreferences:{
      nodeIntegration:true
    }
  });
  mainWindow.loadFile("www/index.html");
  mainWindow.on("closed",function(){
    mainWindow=null;
  });
}

ipcMain.on("rewrite",(e,arg) => {
  if(typeof arg!="string") arg=JSON.stringify(arg);
  fs.writeFile("www/bounties.json",arg,(err) => console.log(err));
});

app.on("ready",createWindow);
app.on("window-all-closed",function(){
  if(process.platform!=="darwin") app.quit();
});
app.on("activate",function(){
  if(mainWindow===null) createWindow();
});
