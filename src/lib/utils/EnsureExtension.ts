function isImageType(image: File): boolean | string {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
    return validImageTypes.includes(image.type) || "Selected file is not a valid image.";
}

function isAudioType(audio: File): boolean | string {
    const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/flac'];
    return validAudioTypes.includes(audio.type) || "Selected file is not a valid audio file.";
}

export { isImageType, isAudioType };
