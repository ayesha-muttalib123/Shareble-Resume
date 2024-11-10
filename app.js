var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var shareLinkButton = document.querySelector('#share-link button');
var shareableUrlElement = document.getElementById('generated-url');
var shareableUrlContainer = document.getElementById('shareable-url');
var profileImageInput = document.getElementById('profile-image');

// Add event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var work = document.getElementById('work').value;
    var skills = document.getElementById('skills').value;

    // Handle profile image
    var profileImageUrl = '';
    if (profileImageInput.files && profileImageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            profileImageUrl = e.target.result;
            generateResume(name, email, phone, education, work, skills, profileImageUrl);
        };
        reader.readAsDataURL(profileImageInput.files[0]);
    } else {
        generateResume(name, email, phone, education, work, skills, profileImageUrl);
    }
});

// Generate resume with profile image
function generateResume(name, email, phone, education, work, skills, profileImageUrl) {
    var resumeHtml = `
        <h2>${name}</h2>
        ${profileImageUrl ? `<img src="${profileImageUrl}" alt="Profile Image" class="profile-image" />` : ''}
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
}

// Download CV function
function downloadCV() {
    var resumeElement = document.getElementById('resume-display');
    if (!resumeElement) {
        console.error("Resume display element not found.");
        return;
    }
    var options = {
        margin: 1,
        filename: 'Ayesha_Muttalib_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (window.html2pdf) {
        window.html2pdf().from(resumeElement).set(options).save();
    } else {
        console.error('html2pdf is not loaded correctly.');
    }
}

// Event listener for download button
var downloadButton = document.querySelector('#download-cv button');
if (downloadButton) {
    downloadButton.addEventListener('click', downloadCV);
} else {
    console.log('Download button not found');
}

// Shareable link generation
shareLinkButton.addEventListener('click', generateShareableLink);

function generateShareableLink() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var work = document.getElementById('work').value;
    var skills = document.getElementById('skills').value;
    var urlParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        education: education,
        work: work,
        skills: skills
    });
    var shareableUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    shareableUrlElement.textContent = shareableUrl;
    shareableUrlContainer.style.display = 'block';
}

// Load resume from URL parameters
function loadResumeFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    var email = urlParams.get('email');
    var phone = urlParams.get('phone');
    var education = urlParams.get('education');
    var work = urlParams.get('work');
    var skills = urlParams.get('skills');
    if (name && email && education && work && skills) {
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

// Call function to load the resume if URL parameters exist
loadResumeFromUrl();
