const api_key = 'https://api.imgbb.com/1/upload?key=7c5149d68aa7c8554ec08575ce91bdaa'


export async function uploadImage(image: any) {
    let liveUrl = null;

    const formData = new FormData();

    // 1. Generate unique name
    const originalName = image.name.split(".")[0]; // file name without extension
    const ext = image.name.split(".").pop();       // file extension
    const uniqueName = `${originalName}_${Date.now()}.${ext}`;

    // 2. Append image with the same blob but new filename
    const renamedFile = new File([image], uniqueName, { type: image.type });

    formData.append('image', renamedFile);
    formData.append('name', uniqueName);  // imgbb name support

    const response = await fetch(api_key, {
        method: 'POST',
        body: formData
    });

    const imgResponse = await response.json();

    if (imgResponse.success) {
        liveUrl = imgResponse.data.url;
    }

    return liveUrl;
}