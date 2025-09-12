import React, { useState } from 'react';
import { Images, XCircleFill } from 'react-bootstrap-icons';
import "../../styles/MultiImageUploader.css";
import heic2any from "heic2any";

interface MultiImageUploaderProps {
    uploadFiles: File[];
    setUploadFiles: React.Dispatch<React.SetStateAction<File[]>>;
    onFilesChange: (files: FileList) => void;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ 
    uploadFiles,
    setUploadFiles,
    onFilesChange ,
}) => {
    const [previewFiles, setPreviewFiles] = useState<string[]>([]);// 프리뷰용


    // 이미지 업로드 함수
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        // 새롭게 선택된 파일들을 File 객체 배열로 변환
        const newFiles = Array.from(files);

        // 허용 파일 확장자 검사
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic', 'heif']; //heic, heif형식 추가(사파리용)
        const validFiles: File[] = [];

        for (const file of newFiles) {
            const ext = file.name.split(".").pop()?.toLowerCase();
            if (!ext || !allowedExtensions.includes(ext)){
                continue;
            }
            if (file.type === "image/heic" || file.type === "image/heif" || file.type === "image/heix"){
                // 고용량 사진 JPEG로 변환
                try {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.9
                }) as Blob;

                const convertedFile = new File(
                    [convertedBlob], file.name.replace(/\.[^/.]+$/, ".jpeg"), 
                    {type: "image/jpeg"}
                );
                validFiles.push(convertedFile); //변환파일 validate파일에 추가
                } catch (error) {
                console.error("사진 확장자 변환 실패:", error);

                }
            } else {
                validFiles.push(file);
            }
        }

        //다른 확장자 파일 업로드시
        if (validFiles.length === 0) {
            alert('jpg, jpeg, png 형식의 이미지 파일만 업로드할 수 있습니다.');
            e.target.value = ''; 
            return;
        }

        // 기존 파일 목록에 유효 파일 추가
        const updatedFiles = [...uploadFiles, ...validFiles];
        setUploadFiles(updatedFiles);

        // FileList로 post page에 전달
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach((file) => dataTransfer.items.add(file));
        onFilesChange(dataTransfer.files);

        // 미리보기 생성
        const newPreviewFiles = validFiles.map((file) => URL.createObjectURL(file));
        setPreviewFiles((prev) => [...prev, ...newPreviewFiles]);
        };
    
    // 이미지 삭제
    const deleteImage = (index: number) => {

        // 미리보기 배열에서 삭제
        setPreviewFiles(prev => prev.filter((_, i) => i !== index));
        
        // db업로드 배열에서 삭제
        const updatedFiles = uploadFiles.filter((_, i) => i !== index);
        setUploadFiles(updatedFiles);

        // PostPage로 파일 목록 전달
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach((file) => dataTransfer.items.add(file));
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
                    accept=".jpg,.jpeg,.png,.heic,.heif"
                    onChange={handleFileChange}
                    className='input'
                />
            </label>
    
            {/* 이미지 프리뷰 영역 */}
            <div className='gap-3 d-flex'>
                {previewFiles.map((imageUrl, idx) => (
                    <div key={idx} className='preview-container'>
                        <button onClick={() => deleteImage(idx)} className='img-delete-button'>
                            <XCircleFill size={20}></XCircleFill>
                        </button>
                        <img src={imageUrl} alt={`preview-${idx}`} className='preview-img' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultiImageUploader;


