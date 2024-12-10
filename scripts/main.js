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
                case 'sectionAboutMe':
                    element.style.backgroundColor = 'lightorange';
                    break;

                case 'sectionPokemon':
                    element.style.display = 'flex';
                    element.style.flexDirection = 'column';
                    break;

                case 'sectionPortfolio':
                    element.style.backgroundColor = 'lightred';
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
            }}

        } catch (error) {
            console.error('Error loading content:', error);
    }
}
console.log('Loading html content...');
loadContent('aboutme', 'sectionAboutMe'); 
loadContent('pokemon/pokemon', 'sectionPokemon'); 
loadContent('skills', 'sectionPortfolio'); 
loadContent('portfolio', 'sectionResume'); 
loadContent('resume', 'sectionResume'); 
loadContent('contact', 'sectionContact'); 
  
