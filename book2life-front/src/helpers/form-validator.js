export const validateInputField = (label, type, value) =>{
    
    //une magnifique condition switch
    switch(type){
        //si c'est email
        case 'email':   
            //on test le mail à l'aide d'un regex 
            const regMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
            //si le teste du regex est négatif
            if(regMail.test(value) === false) {
                //on retourne un message d'erreur
                return `Le champs ${label} est invalide!` 
            }  
         break;
        //si c'est password
        case 'password':
            //on test le mot de passe à l'aide d'un regex qui test la valeur pour avoir 8 chiffres,au moins une lettre, une majuscule une minuscule et un caractère spécial.
            const regPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
            //si le test du regex est négatif
            if(regPass.test(value) === false) {
                //on retourne un message d'erreur
                return `Le champs ${label} doit contenir 8 chiffres,au moins une lettre, une majuscule une minuscule et un caractère spécial.`
            }
        break;
        //si c'est l'addresse, le prenom...
        case 'city':
        case 'firstname':
        case 'lastname':
        case 'nickname':    
            //si la longueur de la valeur est supérieur à 20 caractères
            if(value.length > 30)
                //on retourne un message d'erreur
                return `Le champs ${label} comporte trop de caractère.`
        break;
        //si c'est le code postal
        case 'zip':
            //on test le code postal à l'aide d'un regex 
            const regzip = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
            if(regzip.test(value) === false) {
                //on retourne un message d'erreur
                return `Le champs ${label} est invalide!` 
            } 
        break;
        //si c'est le téléphone
        case 'phone':
            //on test le code postal à l'aide d'un regex 
            const regPhone= /^((\+)33|0)[1-9](\d{2}){4}$/;
            if(regPhone.test(value) === false) {
                //on retourne un message d'erreur
                return `Le champs ${label} est invalide!` 
            } 
        break;
        case 'contents':  
        case 'synopsis':
            //si la longueur de la valeur est supérieur à 200 caractères
            if(value.length > 500){
                //on retourne un message d'erreur
                return `Le champs ${label} comporte trop de caractère.`
            }
        break;
        case 'photo':    
            //format de fichier autorisé pour la photo: jpg, jpeg, png et webp
            const extensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i; 
            if(!extensions.test(value)){
                //on retourne un message d'erreur
                return `Format de ${label} non valide.`
            }
        break;
        default:
            console.log(`Erreur: ${type}.`);
    }            
    
    //on retourne true (toutes les conditions sont bien remplies du coup)
    return true;
    
    
}