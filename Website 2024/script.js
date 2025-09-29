document.addEventListener('DOMContentLoaded', function() {
    const fileContent = {
        PROFILE: `SENIOR PRODUCT DESIGNER AT PILOT

"BUILDING THOUGHTFUL PRODUCTS, ONE HONEST CONVERSATION AT A TIME."
VIEW_PORTFOLIO`,

        HISTORY: 
`2022-PRESENT      PILOT
2021-2022         HYPR
2018-2021         WAYFAIR
2018              ACCENTURE
2017              MOMENT`,
        RESUME: `DOWNLOAD_RESUME`,
        CONTACT: `SAY HI!
INSTAGRAM
TWITTER
LINKEDIN`
    };

    const fileLinks = document.querySelectorAll('.file');
    const currentFile = document.getElementById('current-file');
    const fileContentElement = document.getElementById('file-content');

    const fileKeys = Object.keys(fileContent);
    const defaultFile = fileKeys[0];

    let currentActiveFile = '';
    let currentTypingInterval = null;

    updateDirectory();

    function typeContent(element, content, callback, speed = 0.5) {
        if (currentTypingInterval) {
            clearInterval(currentTypingInterval);
        }
        let i = 0;
        element.innerHTML = '';
        currentTypingInterval = setInterval(() => {
            if (i < content.length) {
                element.innerHTML += content.charAt(i);
                i++;
            } else {
                clearInterval(currentTypingInterval);
                currentTypingInterval = null;
                if (callback) callback();
            }
        }, speed);
    }

    function updateDirectory() {
        console.log("Updating directory...");
        const directoryItems = document.querySelectorAll('.file');


        directoryItems.forEach(item => {
            const file = item.getAttribute('data-file');
            const content = fileContent[file];
            const charCount = content.length;

            const span = document.createElement("span");
            span.className = "fileSize";
            span.innerHTML = charCount;
            item.appendChild(span);
        });
    }

    function updateContent(file) {
        if (file === currentActiveFile) return;

        // Remove all .active classes from file links
        fileLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add .active class to the current file link
        const currentFileLink = document.querySelector(`.file[data-file="${file}"]`);
        if (currentFileLink) {
            currentFileLink.classList.add('active');
        }

        currentActiveFile = file;
        currentFile.textContent = file + (file === 'RESUME' ? '.PDF' : '.TXT');
        let content = fileContent[file];
        typeContent(fileContentElement, content, () => {
            if (file === 'PROFILE') {
                fileContentElement.innerHTML = fileContentElement.innerHTML.replace(
                    'VIEW_PORTFOLIO',
                    '<a href="https://www.jasonkim.xyz/portfolio" target="_blank" rel="noopener noreferrer" class="file">VIEW_PORTFOLIO</a>'
                );
            } else if (file === 'CONTACT') {
                fileContentElement.innerHTML = fileContentElement.innerHTML
                    .replace('INSTAGRAM', '<a href="https://www.instagram.com/kim.json" target="_blank" class="file">INSTAGRAM</a>')
                    .replace('TWITTER', '<a href="https://twitter.com/miknosaj" target="_blank" class="file">TWITTER</a>')
                    .replace('LINKEDIN', '<a href="https://www.linkedin.com/in/miknosaj" target="_blank" class="file">LINKEDIN</a>');
            } else if (file === 'RESUME') {
                fileContentElement.innerHTML = fileContentElement.innerHTML.replace(
                    'DOWNLOAD_RESUME',
                    '<a href="files/Jason-Kim_Resume2025.pdf" class="file">DOWNLOAD_RESUME</a>'
                );
            }
            fileContentElement.innerHTML += '<span class="cursor"></span>';
        });
    }

    // Load default content
    updateContent(defaultFile);

    fileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const file = this.getAttribute('data-file');
            updateContent(file);
        });
    });

    function updateNYCTime() {
        const options = { 
            timeZone: 'America/New_York',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const nycDate = new Date().toLocaleString('en-US', options);
        const formattedDate = nycDate.replace(' at', '');
        document.getElementById('current-time').textContent = formattedDate;
    }

    // Update time immediately and then every second
    updateNYCTime();
    setInterval(updateNYCTime, 1000);
});
