import axios from "axios";
export async function GetAllWordsFromDB() {
    try {
        let response = await axios.get(`https://learn-words-7ba20-default-rtdb.firebaseio.com/word.json`);
        let arrayWord = [];
        Object.keys(response.data).forEach((key, index) => {
            arrayWord.push({
                id: index,
                word:response.data[key].word,
                translation:response.data[key].translation,
            })
        });
        return await arrayWord
    }catch (e) {
        console.log(e)
    }
}
export async function SendWordsInDB(table, data) {
    try {
        await axios.post(`https://learn-words-7ba20-default-rtdb.firebaseio.com/${table}.json`, data);
    }catch (e) {
        console.log(e)
    }
}
export async function GetAllThemesFromDB() {
    try {
        let response = await axios.get(`https://learn-words-7ba20-default-rtdb.firebaseio.com/Themes.json`);
        let arrayThemes = [];
        Object.keys(response.data).forEach((key) => {
            arrayThemes.push(response.data[key])
        });
        return await arrayThemes
    }catch (e) {
        console.log(e)
    }
}