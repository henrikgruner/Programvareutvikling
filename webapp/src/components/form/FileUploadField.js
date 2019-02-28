import React from "react";
import ImageUploader from "react-images-upload";

const FileUploadField = ({
  label,
  field: { name, value },
  form: { setFieldValue }
}) => {
  const onSelectImages = pictureFiles => {
    setFieldValue(name, pictureFiles);
  };

  return (
    <div>
      <label>{label}</label>

      <ImageUploader
        name={name}
        withIcon={true}
        buttonText="Last opp bilde(r)"
        onChange={onSelectImages}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        withPreview={true}
      />
    </div>
  );
};

export default FileUploadField;
