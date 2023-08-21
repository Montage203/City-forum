tinymce.init({
    selector: '#editor',
    height: 'calc(100% - 40px)', // To leave space for the toolbar
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
