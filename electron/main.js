import {app,BrowserWindow} from 'electron'
import dotenv from 'dotenv'

dotenv.config();

const createMainWindow = () => {
    
    const mainWindow = new BrowserWindow(
        {
            title: "Vaishnavi Krushi kendra",
            width : 1280,
            height: 800,
            webPreferences: {
                nodeIntegration: true
            }
        }
    );

    //development enviornment
    mainWindow.loadURL(process.env.FRONTEND_DEV_URI);

}

app.whenReady().then(createMainWindow);