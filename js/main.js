import {createSimilarAdverts} from './data.js';
import {createCardsList} from './card.js'

const advertsData = createSimilarAdverts(1);
const cardsListParent = document.querySelector('#map-canvas');

createCardsList(cardsListParent, advertsData);
