import React, { useState } from 'react';
import { Images, XCircleFill } from 'react-bootstrap-icons';
import "../../styles/MultiImageUploader.css"

const ImageUploader: React.FC = () => {
    const [, setPostImg] = useState<File[]>([]); //db업로드용, postImg
    const [previewImg, setPreviewImg] = useState<string[]>([]); //미리보기용
     //이미지 업로드   
    function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];//허용  파일확장자

        const files = Array.from(e.target.files || []);

        //파일 확장자 검사
        const validFiles = files.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext && allowedExtensions.includes(ext);
        });

        if (validFiles.length === 0) {
        alert('jpg, jpeg, png 형식의 이미지 파일만 업로드할 수 있습니다.');
        return;
        }

        //db업로드용 배열
        setPostImg(validFiles);

        //파일 읽기 
        const fileUrlPromises = validFiles.map(file => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        });
        //모든 파일 읽기 성공 후 미리보기 배열 설정
        Promise.all(fileUrlPromises)
        .then(results => {
            setPreviewImg(results);
        })
        .catch(err => {
            console.error('이미지 읽기 실패:', err);
        });
    }

    const deleteImage = (index: number)=>{
        setPreviewImg(prev => {
            const next = prev.filter((_, i) => i !== index);
            return next;
        });
    
        setPostImg(prev => prev.filter((_, i) => i !== index));
    }

  return (
    <div className='mb-3 d-flex align-items-center'>
        {/* 업로드 영역 */}
        <label className='image-upload-area me-3'>
            <div></div>
            <Images color='grey' size={32}></Images>
            <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={uploadFile}
                className='input'
            />
        </label>

        {/* 이미지 프리뷰 영역 */}
        <div className='gap-3 d-flex'>
            {previewImg.map((url, idx) => (
                <div key={url} className='preview-container'>
                    <button onClick={()=>deleteImage(idx)} className='img-delete-button'><XCircleFill size={20}></XCircleFill></button>
                    <img src={url} alt={`preview-${idx}`} className='preview-img' />
                </div>
            ))}
        </div>
    </div>
  );
}

export default ImageUploader;



