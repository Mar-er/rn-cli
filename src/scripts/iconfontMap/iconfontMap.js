const shell = require('shelljs');
const path = require('path');

shell.exec('pip install fonttools');
shell.exec(`python ${path.resolve(__dirname, 'iconfontMap.py')} ${path.resolve(__dirname, '../../public/icon/iconfont.ttf')} ${path.resolve(__dirname, '../../public/icon/iconfont.js')}`);
shell.mv(path.resolve(__dirname, '../../public/icon/iconfont.ttf'), path.resolve(__dirname, '../../../android/app/src/main/assets/fonts/'));
