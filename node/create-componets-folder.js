const Fs = require("fs");
const Readline = require("readline");
const Path = require("path");

const CreateComponetsFolder = () => {
  const FloderName = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  FloderName.question("请输入创建组件的文件夹名字:", (name) => {
    const componetsPath = `${Path.resolve(__dirname, "..")}\\components`;

    const path = `${componetsPath}\\${name}`;

    if (Fs.existsSync(path)) console.log("此文件夹已存在");
    else {
      Fs.mkdir(path, {}, (result) => {
        if (Object.is(null, result)) {
          const html = Fs.readFileSync(`${__dirname}\\assets\\index.html`);
          const componetJs = Fs.readFileSync(
            `${__dirname}\\assets\\componet.js`
          );
          Fs.writeFileSync(`${componetsPath}\\${name}\\index.html`, html);
          Fs.writeFileSync(
            `${componetsPath}\\${name}\\componet.js`,
            componetJs
          );

          console.log("成功创建文件夹");
          FloderName.close();
        }
      });
    }
  });
};

CreateComponetsFolder();
