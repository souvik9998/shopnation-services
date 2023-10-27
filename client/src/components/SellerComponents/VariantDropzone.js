import { useDropzone } from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';

const VariantDropzone = ({ variant,setVariant}) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = useCallback((files) => {
    console.log(files);
    const newFiles = files.filter((file) => !acceptedFiles.some((f) => f.name === file.name));
    const updatedProductImages = [...variant.productImages, ...newFiles];
    setAcceptedFiles([...acceptedFiles,...newFiles]);
    setVariant({
      ...variant,
      productImages : updatedProductImages
    })
  }, [variant, setVariant]);

  const removeImage = (file) => {
    const newProductImages = variant.productImages.filter((image) => image !== file);
    setVariant({
      ...variant,
      productImages:newProductImages
    })
    setAcceptedFiles(acceptedFiles.filter((f) => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  useEffect(() => {
      acceptedFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
      setVariant({
        ...variant,
        productImages : []
      })
      setAcceptedFiles([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    multiple: true, // Accept only image files
  });
  console.log(acceptedFiles);
  return (
    <>
      <div {...getRootProps({ className: `w-[65%] rounded-lg border-2 border-dashed border-zinc-300` })}>
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 ? (
          <div className='h-full w-full flex flex-col justify-center items-center'>
            <div className='text-zinc-500 text-base'>
              <ion-icon name='image-outline'></ion-icon>
            </div>
            <div className='text-sm font-medium text-zinc-500'>
              {isDragActive ? 'Drop your additional images here' : 'Drag your additional images here'}
            </div>
          </div>
        ) : (
          <div className='flex w-full h-full flex-wrap'>
            {acceptedFiles.map((file) => (
              <div key={file.name} className='p-1 relative w-[25%] h-[50%]'>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className='w-full h-full rounded-md border border-gray-300'
                />
                <div
                  className='absolute -top-1  -right-1'
                  onClick={() => removeImage(file)}
                >
                  <ion-icon name='close-circle' style={{fontSize:'15px' ,color:'red'}}></ion-icon>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VariantDropzone;


