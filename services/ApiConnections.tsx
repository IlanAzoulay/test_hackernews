import axios from 'axios';

export type storyType = {
    by : string,
    descendants : number,
    id : number,
    score : number,
    time : number,
    title : string,
    type : string,
    url : string
}

const baseURL = "https://hacker-news.firebaseio.com/v0/";
const newURL = "newstories.json";
const topURL = "topstories.json";
const specificURL = "item/";

export async function getNewStoryIDs(): Promise<number[]> {
    const ids = await axios.get<number[]>(baseURL + newURL);
    return ids.data;
}

export async function getTopStoryIDs(): Promise<number[]> {
    const ids = await axios.get<number[]>(baseURL + topURL);
    return ids.data;
}

export async function getStoryFromID(id: number): Promise<storyType> {
    const story = await axios.get<object>(baseURL + specificURL + id + ".json");
    return story.data as storyType;
}
