const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;
const shareLinkButton = document.querySelector('#share-link button') as HTMLButtonElement;
const shareableUrlElement = document.getElementById('generated-url') as HTMLSpanElement;
const shareableUrlContainer = document.getElementById('shareable-url') as HTMLDivElement;



form.addEventListener('submit', function(event: Event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const work = (document.getElementById('work') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Generate the resume display
    const resumeHtml = `
        <h2>${name}</h2>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>

        <div class="resume-section">
            <h3>Education</h3>
            <p contenteditable="true">${education}</p>
        </div>

        <div class="resume-section">
            <h3>Work Experience</h3>
            <p contenteditable="true">${work}</p>
        </div>

        <div class="resume-section">
            <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
        </div>
    `;

    if (resumeDisplay) {
        resumeDisplay.innerHTML = resumeHtml;
    } else {
        console.log('The resume display element is missing');
    }
});
// Define the downloadCV function

// Ensure html2pdf.js is included in your HTML
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>

function downloadCV(): void {
    const resumeElement = document.getElementById('resume-display');
    if (!resumeElement) {
        console.error("Resume display element not found.");
        return;
    }

    // Options for html2pdf.js
    const options = {
        margin:       1,
        filename:     'Ayesha_Muttalib_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf.js to generate PDF from the HTML content
    // Make sure html2pdf is available
    if ((window as any).html2pdf) {
        (window as any).html2pdf().from(resumeElement).set(options).save();
    } else {
        console.error('html2pdf is not loaded correctly.');
    }
}

// Add the click event listener to the download button
const downloadButton = document.querySelector('#download-cv button') as HTMLButtonElement;
if (downloadButton) {
    downloadButton.addEventListener('click', downloadCV);
} else {
    console.log('Download button not found');
}






shareLinkButton.addEventListener('click', generateShareableLink);

// Function to create and display a shareable link
function generateShareableLink(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const work = (document.getElementById('work') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Encode the resume data in URL parameters
    const urlParams = new URLSearchParams({
        name,
        email,
        phone,
        education,
        work,
        skills
    });

    const shareableUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    shareableUrlElement.textContent = shareableUrl;
    shareableUrlContainer.style.display = 'block';
}

// Function to populate the resume from URL parameters if available
function loadResumeFromUrl(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const education = urlParams.get('education');
    const work = urlParams.get('work');
    const skills = urlParams.get('skills');

    if (name && email && education && work && skills) {
        // Populate the resume display
        resumeDisplay.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>

            <div class="resume-section">
                <h3>Education</h3>
                <p>${education}</p>
            </div>

            <div class="resume-section">
                <h3>Work Experience</h3>
                <p>${work}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <p>${skills}</p>
            </div>
        `;
    }
}

// Call the function to load the resume if parameters exist
loadResumeFromUrl();