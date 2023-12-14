import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem('book2life-token')
const adminToken = window.localStorage.getItem('book2life-adminToken')


/****************************************************************************
***********************Récupérations des livres******************************
****************************************************************************/

//Récupération des infos des derniers livres
export const loadLastBooks = () => {
    return axios.get(`${config.api_url}/api/v1/books/last`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupération des infos de tous les livres d'un utilisateur déconnecté
export const loadBooksByUser2 = (id_user) => {
  return axios.get(`${config.api_url}/api/v1/booksByUser2/all/${id_user}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupération des infos de tous les livres d'un utilisateur connecté
export const loadBooksByUser = (id_user) => {
    return axios.get(`${config.api_url}/api/v1/booksByUser/all/${id_user}`,{headers: { "x-access-token": token }})
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupération des infos d'un livre par son id
export const loadBook = (id_book) => {
    return axios.get(`${config.api_url}/api/v1/book/one/${id_book}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupérartion des infos de toutes les catégories
export const loadCategories= () => {
    return axios.get(`${config.api_url}/api/v1/categories/all`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupérartion des états des livres
export const loadBookState= () => {
  return axios.get(`${config.api_url}/api/v1/bookState/all`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion des âges de la sous catégorie jeunesse
export const loadAges = () => {
  return axios.get(`${config.api_url}/api/v1/sousCatJeunnesse`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion des genres de la sous catégorie humour
export const loadGenderHumour = () => {
  return axios.get(`${config.api_url}/api/v1/sousCatHumour`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion de la sous catégorie manga par genre
export const loadGenderManga = () => {
  return axios.get(`${config.api_url}/api/v1/sousCatMangaGender`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion de la sous catégorie manga par theme
export const loadThemeManga = () => {
  return axios.get(`${config.api_url}/api/v1/sousCatMangaTheme`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion des infos de tout les livres par catégories
export const loadBooksByCat= (id_cat) => {
  return axios.get(`${config.api_url}/api/v1/allBooks/categorie/${id_cat}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion des infos de tous les livres de la sous-catégorie tri_humour
export const loadTriHumour= (id_tri) => {
    return axios.get(`${config.api_url}/api/v1/humour/tri/${id_tri}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupérartion des infos de tous les livres de la sous-catégorie tri_jeunesse
export const loadTriJeunesse= (id_tri) => {
    return axios.get(`${config.api_url}/api/v1/jeunesse/tri/${id_tri}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupérartion des infos de tous les livres de la sous-catégorie tri_mangaBygender
export const loadMangaByGender= (id_tri) => {
    return axios.get(`${config.api_url}/api/v1/mangaByGender/${id_tri}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupérartion des infos de tous les livres de la sous-catégorie tri_mangaBytheme
export const loadMangaByTheme= (id_tri) => {
    return axios.get(`${config.api_url}/api/v1/mangaByTheme/${id_tri}`)
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

//récupération des infos de tous les livres gratuits
export const loadFreeBooks = () => {
  return axios.get(`${config.api_url}/api/v1/freeBooks/all`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion des infos des livres gratuits par catégorie
export const loadLastFreeBooksByCat = (id_cat) => {
  return axios.get(`${config.api_url}/api/v1/lastFreeBooks/categorie/${id_cat}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};


//récupération des infos de tous les livres non validé
export const loadNotValidateBooks = () => {
  return axios.get(`${config.api_url}/api/v1/books/no/all`, {headers: { "x-access-token": adminToken }})
    .then((res) => res.data)
    .catch((err) => err.response.data);
};


//récupérartion des infos des livres dans la bdd en fonction de la recherche de mot clé
export const loadBooksByKeyword = (keyword) => {
  return axios.get(`${config.api_url}/api/v1/keyword/${keyword}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//récupérartion des infos des livres dans la bdd en fonction de la recherche de localisation
export const loadBooksByLocation = (location) => {
  return axios.get(`${config.api_url}/api/v1/location/${location}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};


//récupérartion des infos des livres dans la bdd en fonction de la recherche de localisation et catégorie
export const loadBooksByLocationAndCat = (location, id_cat) => {
return axios.get(`${config.api_url}/api/v1/location/${location}/${id_cat}`)
  .then((res) => res.data)
  .catch((err) => err.response.data);
};

//récupération des infos de tous les livres d'un utilisateur connecté
export const loadFavoritesByUser = (id_user) => {
  return axios.get(`${config.api_url}/api/v1/favoritesByUser/all/${id_user}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};



/****************************************************************************
***********************Actions réaliséés par un user*************************
****************************************************************************/

//sauvegarde d'un livre
export const saveBook = (datas) => {
    return axios
    .post(config.api_url + "/api/v1/book/save", datas, {headers: { "x-access-token": token }})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });    
}

//sauvegarde d'un message
export const saveMessage = (datas) => {
  return axios
  .post(config.api_url + "/api/v1/message/save", datas, {headers: { "x-access-token": token }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });    
}


//modification d'un livre par l'utilisateur
export const updateBook = (datas, id_book) => {
  return axios
  .put(config.api_url + `/api/v1/book/update/${id_book}`, datas, {headers: { "x-access-token": token }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });   
}

//suppression d'un livre
export const deleteBook= (id_book) => {
  return axios
  .delete(config.api_url + `/api/v1/book/delete/${id_book}`, {headers: { "x-access-token": token }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });
}


//sauvegarde d'un livre dans les favoris
export const saveFavoriteBook = (datas) => {
  return axios
  .post(config.api_url + "/api/v1/favorite/save", datas, {headers: { "x-access-token": token }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });    
}


//suppression d'un livre des favoris
export const deleteFavoritesBook= (id_book) => {
  return axios
  .delete(config.api_url + `/api/v1/favorite/delete/${id_book}`, {headers: { "x-access-token": token }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });
}


/****************************************************************************
***********************Actions réaliséés par un admin************************
****************************************************************************/


//validation d'un livre par l'administrateur
export const validateBook = (id_book) => {
    return axios
    .put(config.api_url + `/api/v1/book/validate/${id_book}`, {headers: { "x-access-token": adminToken }})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });   
}

//suppression d'un livre par l'administrateur
export const deleteBookAdmin= (id_book) => {
  return axios
  .delete(config.api_url + `/api/v1/book/adminDelete/${id_book}`, {headers: { "x-access-token": adminToken }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });
}









