// Exécute le code après le chargement de toutes les ressources de la page
window.onload = () => {
  getData();
};

/**
 * Récupèrer les données envoyées du back en les vérifiants
 * @async
 */
const getData = async () => {
  const urlData = 'http://localhost:3000/api/products';
  // Instruction que je souhaite exécuter (essayer)
  try {
    // Attente de la promesse en utilisant "await"
    const response = await fetch(urlData);
    console.log(response)
    // Création d'une erreur s'il n'y a aucune reponse en utilisant un littéral de gabarit
    if (!response.ok) {
      throw new Error(
        `Erreur de requête, vérifier l'état du serveur ${response.status}`
      );
    }
    // Récupération de la réquête et la transformer en objet pour l'utiliser dans l'appel de la fonction displayData
    const products = await response.json();
    displayData(products);
    // Une clause contenant l'erreur créée si une exception est levée par une instruction du bloc "try"
  } catch (error) {
    alert(error);
  }
};

/**
 * Cette fonction créée les élements HTML pour les injecter dans le DOM en utilisant une boucle.
 * @param {Array} products
 */
const displayData = (products) => {
  const items = document.getElementById('items');
  // Boucle "for of" pour la création des articles
  // Element est un objet
  for (let element of products) {
    console.log(typeof (element));
    const newLink = document.createElement('a');
    // Récupération de l'url du produit avec son id en paramètre (methode get = obtenir)
    newLink.setAttribute('href', `./product.html?id=${element._id}`);
    const newArticle = document.createElement('article');
    const newImage = document.createElement('img');
    newImage.setAttribute('src', element.imageUrl);
    newImage.setAttribute('alt', element.altTxt);
    const title = document.createElement('h3');
    title.setAttribute('class', 'productName');
    title.textContent = element.name;
    const para = document.createElement('p');
    para.setAttribute('class', 'productDescription');
    para.textContent = element.description;

    // Ajouter dans le DOM les éléments créés (Document Object Model)
    newArticle.append(newImage, title, para);
    newLink.append(newArticle);
    items.append(newLink);
  }
};
