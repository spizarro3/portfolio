async function loadContent(page, elementId) {
    try {
        const response = await fetch(`/pages/${page}.html`); // Path to local file
        const html = await response.text();
            
        // Inject the content into a specific element
        const element = document.getElementById(elementId);

        if (element) {
            element.innerHTML = html;

            // Switch case to handle different sections
            switch (element.id) {
                case 'sectionHome':
                    element.style.backgroundColor = '#2C3E50';
                    break;
              
                case 'sectionAboutMe':
                    element.style.backgroundColor = '#4682b4';
                    break;

                case 'sectionPokemon':
                    element.style.display = 'flex';
                    element.style.flexDirection = 'column';
                    element.style.backgroundColor = '#2C3E50';
                    break;

                case 'sectionPortfolio':
                    element.style.backgroundColor = 'red';
                    break;

                case 'sectionResume':
                    element.style.backgroundColor = 'lightgreen';
                    break;

                case 'sectionContact':
                    element.style.backgroundColor = 'lightblue';
                    break;

                default:
                    console.log('Section ID not recognized');
                    break;
                }
            }

        } catch (error) {
            console.error('Error loading content:', error);
    }
}
console.log('Loading html content...');
loadContent('home', 'sectionHome'); 
loadContent('aboutme', 'sectionAboutMe'); 
loadContent('pokemon/pokemon', 'sectionPokemon'); 
loadContent('skills', 'sectionPortfolio'); 
loadContent('portfolio', 'sectionResume'); 
loadContent('resume', 'sectionResume'); 
loadContent('contact', 'sectionContact'); 
  
