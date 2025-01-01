async function loadContent(page, elementId) {
    try {
        const response = await fetch(`/pages/${page}.html`); // Path to local file
        if (!response.ok) {
            throw new Error(`Failed to load page: ${page}`);
        }
        const html = await response.text();
        
        // Inject the content into a specific element
        const element = document.getElementById(elementId);

        if (element) {
            element.style.backgroundImage = 'none'
            element.innerHTML = html;
            
        } else {
            throw new Error(`Element with id ${elementId} not found`);
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}
//is loadProjects being used?
async function loadProjects(){
  
    const contentLeftDiv = document.getElementById("leftDiv");
    const contentRightDiv = document.getElementById("rightDiv");

    if (contentLeftDiv && contentRightDiv){
        console.log(contentLeftDiv, contentRightDiv)
    }
}


//Loading all HTML content
console.log('Loading html content...');
loadContent('home', 'sectionHome'); 
loadContent('aboutme', 'sectionAboutMe'); 
loadContent('skills', 'sectionSkills'); 
loadContent('portfolio', 'sectionPortfolio'); 
loadContent('resume', 'sectionResume'); 
loadContent('contact', 'sectionContact'); 

