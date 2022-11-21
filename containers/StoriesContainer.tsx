import axios from 'axios'
import { useEffect, useState } from 'react'
import { getNewStoryIDs, getTopStoryIDs, getStoryFromID, storyType } from '../services/ApiConnections';
import StoryComponent from '../components/StoryComponent'

import Navbar from '../components/Navbar'

export default function StoriesContainer() {

    const step = 10;

    const [storyIDs, setStoryIDs] = useState<number[]>([]);
    const [endIndex, setEndIndex] = useState<number>(10);  // show stories from 0 to index
    const [stories, setStories] = useState<storyType[]>([]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [newest, setNewest] = useState<boolean>(true);

    // First render
    useEffect(() => {
        (async () => {
          await LoadNewIDs();
        })();
    }, [refreshing]);
    // Stories update when we update the list of IDs
    useEffect(() => {
        (async () => {
            setStories([]);
            loadMoreStories();
          })();
    }, [storyIDs])

    async function LoadNewIDs() {
        setStoryIDs([]);
        if (newest){
            setStoryIDs(await getNewStoryIDs());
        }
        else {
            setStoryIDs(await getTopStoryIDs());
        }
    }
    function pushNewStory(newStory: storyType) {
        setStories(stories => [...stories, newStory]);
    }

    async function loadMoreStories() {
        let oldLen = stories.length;
        for (let i = oldLen; i < Math.min(storyIDs.length, oldLen + step); i++){
            pushNewStory(await getStoryFromID(storyIDs[i]));
        }
        setEndIndex(endIndex + step);
    }

    function changeDataFromNavbar(attr: String) {
        if (attr === "newest"){
            setNewest(!newest);
            setRefreshing(!refreshing);
        }
        else if (attr === "refresh"){
            setRefreshing(!refreshing);
        }
    }

    return (
        <div className='stories-supercontainer'>

            <Navbar
                changeData={changeDataFromNavbar}
                newest={newest}/>

            <div className='stories-container'>
                {
                    stories.map((val, index) => {
                        // console.log("MAP ", index, ": ", JSON.stringify(val));
                        return(
                            <StoryComponent key={index}
                                numero={index}
                                storyData={val}/>
                        )
                    })
                }
            </div>
            
            <button className='button-loadmore' onClick={loadMoreStories}>
                Load more!
            </button>
        </div>
    )
}