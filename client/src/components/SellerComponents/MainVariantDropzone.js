import { useDropzone } from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';

const MainVariantDropzone = ({ variant,setVariant,uploaded,setUploaded }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = useCallback((files) => {
      console.log(files);
      setVariant({
        ...variant,
        mainImage : files[0]
      })
      setAcceptedFiles([files[0]]);
   
  }, [variant, setVariant]);

  const removeImage = (file) => {
    setVariant({
      ...variant,
      mainImage : null
    })
    setAcceptedFiles(acceptedFiles.filter((f) => f !== file));
    URL.revokeObjectURL(file.preview);
    
  };

  useEffect(() => {
    if (uploaded) {
      acceptedFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
      setVariant({
        ...variant,
        mainImage : null
      })
      setAcceptedFiles([]);
      setUploaded(false)
    }
  }, [ uploaded,acceptedFiles]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles:1 // Accept only image files
  });

  return (
    <>
      <div {...getRootProps({ className: `w-[35%] rounded-lg border-2 border-dashed border-zinc-300` })}>
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 ? (
          <div className='h-full w-full flex justify-center items-center gap-2'>
            <div className='text-zinc-500 text-base pt-2'>
            <ion-icon name="cloud-upload"></ion-icon>
            </div>
            <div className='text-sm font-medium text-gray-400'>
              {isDragActive ? 'Variant image' : 'Variant image'}
            </div>
          </div>
        ) : (
          <div className='flex w-full h-full'>
            {acceptedFiles.map((file) => (
              <div key={file.name} className='relative'>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className='w-full h-full rounded-md border border-gray-300'
                />
                <button
                  className='absolute flex items-center justify-center -top-1 bg-red-500 -right-1 h-4 w-4 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-100'
                  onClick={() => removeImage(file)}
                >
                  <ion-icon name='close-circle-outline' style={{fontSize:'14px' ,color:'white'}}></ion-icon>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MainVariantDropzone;