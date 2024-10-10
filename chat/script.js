// Gerenciando upload de vídeo
const videoInput = document.getElementById('video-input');
const uploadBtn = document.getElementById('upload-btn');
const videoPreview = document.getElementById('video-preview');
const previewSection = document.getElementById('preview-section');
const saveBtn = document.getElementById('save-btn');

let videoURL;

uploadBtn.addEventListener('click', () => {
    const file = videoInput.files[0];
    if (file) {
        videoURL = URL.createObjectURL(file);
        videoPreview.src = videoURL;
        previewSection.style.display = 'block';
    } else {
        alert('Por favor, selecione um arquivo de vídeo.');
    }
});

saveBtn.addEventListener('click', () => {
    const savedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    savedVideos.push(videoURL);
    localStorage.setItem('videos', JSON.stringify(savedVideos));
    alert('Vídeo salvo com sucesso!');
    previewSection.style.display = 'none';
});

// Exibindo vídeos salvos
if (window.location.pathname.includes('videos.html')) {
    const videosContainer = document.getElementById('videos-container');
    const savedVideos = JSON.parse(localStorage.getItem('videos')) || [];

    if (savedVideos.length > 0) {
        savedVideos.forEach((videoSrc, index) => {
            const videoElement = document.createElement('video');
            videoElement.src = videoSrc;
            videoElement.controls = true;
            videosContainer.appendChild(videoElement);
        });
    } else {
        videosContainer.innerHTML = '<p>Nenhum vídeo foi publicado ainda.</p>';
    }
}
