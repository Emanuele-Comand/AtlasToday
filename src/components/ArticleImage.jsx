import { useState } from "react";

const ArticleImage = ({
  src,
  alt,
  className = "",
  fallbackSrc = "/src/assets/atlas_today_banner.png",
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
};

export default ArticleImage;
