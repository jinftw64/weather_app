const lazyLoad = (() => {
  const importAll = (r) => {
    return r.keys().map(r);
  }

  const getImage = (imageName, img) => {
    import(
      `./icons/${imageName}`
    )
      .then(src => img.src = src.default)
      .catch(err => console.error(err));
  };

  const getBanner = (subfolder) => {
    const images = require.context('./banners/', true, /\.(png)$/);

    const createImagesMap = () => {
      const imagesMap = {};

      images.keys().forEach((key) => {
        // Extract subfolder and filename from the path
        const pathParts = key.split('/');
        const subfolder = pathParts[1];
        const filename = pathParts.slice(2).join('/');

        if (!imagesMap[subfolder]) {
          imagesMap[subfolder] = [];
        }
        imagesMap[subfolder].push(filename);
      });

      console.log(imagesMap);
      return imagesMap;
    };

    const imagesMap = createImagesMap();

    function getRandomImageFromSubfolder(subfolder) {
      const subImages = imagesMap[subfolder];
      if (subImages && subImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * subImages.length);
        console.log(subImages[randomIndex]);
        return subImages[randomIndex];
      }
      return null;
    }

    return getRandomImageFromSubfolder(subfolder);
  };

  return {
    getImage,
    getBanner,
  }
})();

export default lazyLoad;
