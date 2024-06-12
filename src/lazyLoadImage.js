const lazyLoadImage = (imageName, img) => {
  import(
    `./icons/${imageName}`
  )
    .then(src => img.src = src.default)
    .catch(err => console.error(err));
};

export default lazyLoadImage;
