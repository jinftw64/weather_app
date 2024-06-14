const randomFile = (() => {

  const get = (somePath) => {
    const fs = require('fs');
    const path = require('path');
    fs.readdir(path.join(process.cwd(), 'banners'), (error, files) => {
      console.log(error, files)
    })
  }

  return { get }
})();

export default randomFile;
