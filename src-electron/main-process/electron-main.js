import { app, BrowserWindow, dialog } from 'electron';
/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
import { autoUpdater } from 'electron-updater';
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
app.setAppUserModelId('Wa.coconutt.io.0001');
// autoUpdater.updateConfigPath =
// 	'D:\\CODE\\vue\\electron-quasar-onceclick\\dist\\electron-mat\\electron-quasar-oneclick-win32-x64\\resources\\app-update.yml';
log.info('App starting...');

if (process.env.PROD) {
	global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\');
}
let mainWindow;

function sendStatusToWindow(text) {
	log.info(text);
	mainWindow.webContents.send('message', text);
}
function createWindow() {
	/**
   * Initial window options
   */
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		useContentSize: true
	});

	mainWindow.loadURL(process.env.APP_URL);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	autoUpdater.checkForUpdatesAndNotify();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
	sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', (info) => {
	sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', (err) => {
	sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
	let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
	sendStatusToWindow(log_message);
});
autoUpdater.signals.updateDownloaded(() => {
	let message = `${app.getName()} ${releaseName} está disponible y listo para instalar.`;
	if (releaseNotes) {
		const splitNotes = releaseNotes.split(/[^\r]\n/);
		message += '\n\nRelease notes:\n';
		splitNotes.forEach((notes) => {
			message += notes + '\n\n';
		});
	}
	dialog.showMessageBox(
		{
			type: 'question',
			buttons: [ 'Instalar', 'Después' ],
			defaultId: 0,
			message: `Una nueva versión de  ${app.getName()} ha sido descargada`,
			detail: message
		},
		(response) => {
			if (response === 0) {
				setTimeout(() => autoUpdater.quitAndInstall(false, true), 1);
			}
		}
	);
});
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
	sendStatusToWindow('Update downloaded');
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
