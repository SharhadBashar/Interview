import { BASE_URL } from 'react-native-dotenv'

const route = "auth/auth";

export const loginFacebook = (accessToken, userID) => {
    return fetchWrapper(route+'/login/facebook', 'POST', {accessToken, userID});
}
export const logoutFacebook = (accessToken, userID) => {
    return fetchWrapper(route+'/logout/facebook', 'DELETE', {accessToken, userID});
}

function fetchWrapper(path:string, method:string, params:{} = null) {
    return fetch(`${BASE_URL}/${path}`,
    {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: params && JSON.stringify(params)
    }).then(res => res.json());
}


//?NOT FULLY TESTED
//!NOT IMPLEMENTED
//Lesson data
//TODO the rest

//Favorite categories 
export const getFavoriteCategories = (userID:Number) => { //**look at getquestions */
    return fetchWrapper(`auth/user/favoritecategories/${userID}`, 'GET');
}

export const setFavoriteCategory = (userID, categoryID) => { //**look at getquestions */
    return fetchWrapper(`auth/user/favoritecategories`, 'POST', {userID, categoryID});
}

export const unsetFavoriteCategory = (userID, categoryID) => { //**look at getquestions */
    return fetchWrapper(`auth/user/favoritecategories`, 'DELETE', {userID, categoryID});
}
export const updateFavoriteCategory = (userID, categoryID, progress) => { //**look at getquestions */
    return fetchWrapper(`auth/user/favoritecategories`, 'PUT', {userID, categoryID, progress});
}

//Send feedback
export const sendFeedback = (email, feedback) => { //**look at getquestions */
    return fetchWrapper(`auth/user/sendfeedback`, 'POST', {email, feedback});
}
