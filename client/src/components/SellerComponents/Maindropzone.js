import { useDropzone } from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';

const Maindropzone = ({ mainImage, setMainImage, clearImages, setClearImages }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const[count,setCount] = useState(0);
  const onDrop = useCallback((files) => {
    console.log(files);
    setMainImage(files[0]);
    setAcceptedFiles([files[0]]);
   
  }, [mainImage, setMainImage]);

  const removeImage = (file) => {
    setMainImage(null);
    setAcceptedFiles(acceptedFiles.filter((f) => f !== file));
    URL.revokeObjectURL(file.preview);
    setCount(0);
  };

  useEffect(() => {
    if (clearImages) {
      acceptedFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
      setMainImage(null);
      setAcceptedFiles([]);
      setCount(0);
      setClearImages(false);
    }
  }, [clearImages, acceptedFiles, setMainImage]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles:1 // Accept only image files
  });

  return (
    <>
      <div {...getRootProps({ className: `w-[35%] rounded-lg border-2 border-dashed border-zinc-300` })}>
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 ? (
          <div className='h-full w-full flex flex-col justify-center items-center pt-5'>
            <div className='text-zinc-500 text-base'>
              <ion-icon name='image-outline'></ion-icon>
            </div>
            <div className='text-sm text-center font-medium text-zinc-500'>
              {isDragActive ? 'Drag the product cover image' : 'Drag the product cover image'}
            </div>
          </div>
        ) : (
          <div className='flex w-full h-full'>
            {acceptedFiles.map((file) => (
              <div key={file.name} className='p-1 relative'>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className='w-full h-full rounded-md border border-gray-300'
                />
                <div
                  className='absolute -top-[6px]  -right-[6px] '
                  onClick={() => removeImage(file)}
                >
                  <ion-icon name='close-circle' style={{fontSize:'20px',color:'red'}}></ion-icon>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Maindropzone;
