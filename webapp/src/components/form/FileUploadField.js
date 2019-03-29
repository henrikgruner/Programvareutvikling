import React from "react";
import ImageUploader from "react-images-upload";
import { ImageUploaderWrapper } from "./styles";

const FileUploadField = ({
  label,
  field: { name, value },
  form: { setFieldValue }
}) => {
  const onSelectImages = pictureFiles => {
    setFieldValue("images", pictureFiles);
  };

  return (
    <div>
      <label>{label}</label>

      <ImageUploaderWrapper>
        <ImageUploader
          name={name}
          withIcon={true}
          buttonText="Last opp bilde(r)"
          onChange={onSelectImages}
          imgExtension={[".jpeg", ".jpg", ".gif", ".png", ".gif"]}
          withPreview={true}
        />
      </ImageUploaderWrapper>
    </div>
  );
};

export default FileUploadField;
