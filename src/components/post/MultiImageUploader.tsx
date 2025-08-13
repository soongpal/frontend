import React, { useState } from 'react';
import { Images, XCircleFill } from 'react-bootstrap-icons';
import "../../styles/MultiImageUploader.css"

interface MultiImageUploaderProps {
    onFilesChange: (files: FileList | null) => void;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ onFilesChange }) => {
    
    const [previewFiles, setPreviewFiles] = useState<string[]>([]);// 프리뷰용
    const [uploadFiles, setUploadFiles] = useState<File[]>([]); // db업로드용 

    // 이미지 업로드 함수
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        // 새롭게 선택된 파일들을 File 객체 배열로 변환
        const newFiles = Array.from(files);

        // 허용 파일 확장자 검사
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const validNewFiles = newFiles.filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            return ext && allowedExtensions.includes(ext);
        });

        //다른 확장자 파일 업로드시
        if (validNewFiles.length === 0) {
            alert('jpg, jpeg, png 형식의 이미지 파일만 업로드할 수 있습니다.');
            e.target.value = ''; 
            return;
        }

        // 기존 파일 목록에 유효 파일 추가
        const updatedFiles = [...uploadFiles, ...validNewFiles];
        setUploadFiles(updatedFiles);

        // 부모 컴포넌트로 업데이트된 파일 목록 전달

        // DataTransfer 객체를 사용하여 FileList 생성
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach(file => dataTransfer.items.add(file));
        onFilesChange(dataTransfer.files);

        // 미리보기 생성 및 상태 업데이트
        const newPreviewFiles = validNewFiles.map(file => URL.createObjectURL(file));
        setPreviewFiles(prev => [...prev, ...newPreviewFiles]);
    }
    
    // 이미지 삭제
    const deleteImage = (index: number) => {

        // 미리보기 배열에서 삭제
        setPreviewFiles(prev => prev.filter((_, i) => i !== index));
        
        // db업로드 배열에서 삭제
        const updatedFiles = uploadFiles.filter((_, i) => i !== index);
        setUploadFiles(updatedFiles);

        // newPostPage로 파일 목록 전달
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach(file => dataTransfer.items.add(file));
        onFilesChange(dataTransfer.files);
    };

    return (
        <div className='mb-3 d-flex align-items-center'>
            {/* 업로드 영역 */}
            <label className='image-upload-area me-3'>
                <Images color='grey' size={32}></Images>
                <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className='input'
                />
            </label>
    
            {/* 이미지 프리뷰 영역 */}
            <div className='gap-3 d-flex'>
                {previewFiles.map((url, idx) => (
                    <div key={idx} className='preview-container'>
                        <button onClick={() => deleteImage(idx)} className='img-delete-button'>
                            <XCircleFill size={20}></XCircleFill>
                        </button>
                        <img src={url} alt={`preview-${idx}`} className='preview-img' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultiImageUploader;


