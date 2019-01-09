const shell = require('shelljs');
const path = require('path');
const program = require('commander');
const glob = require('glob');

const params = program.parse(process.argv);
const xlogFilename = glob.sync(path.resolve(__dirname, '../../../xlog/*.xlog'));

if (xlogFilename.length) {
  if (params.args.length) {
    // 执行 npm 命令时传入的参数
    const param = params.args[0];
    // 匹配 xlog 目录中满足符合条件的文件名，如果满足返回绝对路径，否则返回null
    const matchParam = xlogFilename.find((v) => {
      const match = /([^/]+)\.xlog$/.exec(v);
      return match.find(val => val === param);
    });

    if (matchParam) {
      shell.exec(`python ${path.resolve(__dirname, 'decode_mars_nocrypt_log_file.py')} ${matchParam}`);
    } else {
      console.log('输入的文件名不正确');
    }
  } else {
    console.log('npm run xlog 必须接受文件名作为参数');
  }
} else {
  console.error('请将日志文件放入到 xlog 目录下');
}
