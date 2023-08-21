tinymce.init({
    selector: '#editor',
    height: 'calc(50%)', // To leave space for the toolbar
    theme: 'silver',
    plugins: 'image media',
    toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist | link image media | forecolor backcolor | codeButton',
    setup: function (editor) {
        editor.ui.registry.addButton('codeButton', {
            text: 'Afficher le code',
            onAction: function () {
                showCode(editor.getContent());
            }
        });

        editor.on('change', function () {
            updatePreview(editor.getContent());
        });
    }
});

const editor = tinymce.get('editor');
const preview = document.getElementById('preview');
const codeContainer = document.getElementById('codeContainer');

function showCode(content) {
    const processedContent = processVideos(content); // Process videos before displaying
    codeContainer.textContent = processedContent;
    codeContainer.style.display = 'block';
}

function processVideos(content) {
    // Replace YouTube video links with [youtube]...[/youtube] tags
    const videoRegex = /<iframe.*src="https:\/\/www\.youtube\.com\/embed\/([^"]+)".*<\/iframe>/g;
    const processedContent = content.replace(videoRegex, '[youtube]https://www.youtube.com/watch?v=$1[/youtube]');
    return processedContent;
}


function updatePreview(content) {
    preview.innerHTML = content;
    preview.style.display = 'block';
    codeContainer.style.display = 'none';
}


const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
});
