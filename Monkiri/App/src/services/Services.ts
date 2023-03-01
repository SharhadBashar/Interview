import { BASE_URL } from 'react-native-dotenv'
 
export const getLessonCategories = () => {
    return fetchWrapper('api/lessoncategories', 'GET');
}

export const getChallenges = () => {
    return fetchWrapper('api/challenges', 'GET');
}

export const getServiceCategories = () => {
    return fetchWrapper('api/servicecategories', 'GET');
}

export const getLesson = (id:Number) => {
    return fetchWrapper(`api/lesson/${id}`, 'GET');
}

export const getQuestions = (lessonId:Number) => {
    return fetchWrapper(`api/lessonquestions/${lessonId}`, 'GET');
}

export const getLessonObjectives = (lessonId:Number) => {
    return fetchWrapper(`api/objectives_lesson/${lessonId}`, 'GET');
}

export const getCategoryObjectives = (categoryId:Number) => {
    return fetchWrapper(`api/objectives_category/${categoryId}`, 'GET');
}

/**
 * 
 * @param id the parent lesson id
 */
export const getLessonQuestions = (id:Number) => {
    return fetchWrapper(`lessonquestions/${id}`, 'GET');
}

export const loginFacebook = (accessToken, userID) => {
    return fetchWrapper('auth/auth/login/facebook', 'POST', {accessToken, userID});
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