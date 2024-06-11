export function awsS3Upload(data: Blob, url: string, progressCB: (progress: number) => void) {
    return new Promise((resolve, reject) => {    
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', (evt) => {
            progressCB(Math.floor((evt.loaded / evt.total) * 100));
        });
        xhr.addEventListener('error', (evt) => {
            reject(new Error('Failed uploading file.'));
        });
        xhr.addEventListener('abort', (evt) => {
            reject(new Error('Upload canceled by user'));
        });
        xhr.addEventListener('loadend', (evt) => {
            progressCB(100);
        });
        xhr.open('PUT', url);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const eTag = xhr.getResponseHeader('ETag');
                if (eTag) {
                    progressCB(100);
                    resolve(eTag.replaceAll('"', ""));
                }
                else {
                    reject(new Error('Cannot read ETag'));
                }
            }
        };
        
        xhr.onerror = (error) => {
            reject(error);
        };

        xhr.onabort = () => {
            reject(new Error('Upload canceled by user'));
        };

        xhr.send(data);
    });
}
