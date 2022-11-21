import { storyType } from '../services/ApiConnections';

export default function StoryComponent( 
    { numero, storyData}: {numero: number, storyData: storyType}) {

    // 1 minute ago, 2 minute*S* ago
    function addS(amount: number): string {
        if (amount > 1) {return "s";}
        return "";
    }

    function getTimeAgo(storyTime: number): string {
        let secondsSinceEpoch = Math.round(Date.now() / 1000);
        let secondsDifference = secondsSinceEpoch - storyTime;

        if (secondsDifference < 60) {return "Just now";}

        let currentDivider = 1
        let dividers = [52, 7, 24, 60];
        dividers.forEach(d => currentDivider *= d);
        let timescales = ["week", "day", "hour", "minute"];
        for (let i = 0; i < timescales.length; i++){
            let result = Math.floor(secondsDifference / currentDivider);
            if (result > 0) {
                return (result + " " + timescales[i] + addS(result) + " ago");
            } else {
                currentDivider /= dividers[i];
            }
        }
        return ("unknown time ago");
    }
    function getBaseURL(url: string | undefined): string {
        if (url == undefined) {return "";}
        let splits = url.split("/")
        return "(" + splits[0] + "//" + splits[2] + ")";
    }

    function protection(attr: any): any {
        if (attr == null || attr == undefined) {return "";}
        return attr;
    }

    return (
        <div>
            <div className='story-container'>
                <div className='numero'>
                    {numero + 1}.
                </div>
                <div className='flex flex-col'>
                    <div className='story-flex-up'>
                        <a href={protection(storyData.url)} target="_blank" className='title'>
                            {protection(storyData.title)}
                        </a>
                        <a href={protection(storyData.url)} target="_blank" className='url'>
                            {getBaseURL(storyData.url)}
                        </a>
                    </div>

                    <div className='story-flex-down'>
                        <div className='extra-info'>{storyData.score} points</div>
                        <div className='extra-text'>by</div>
                        <div className='extra-info'>{storyData.by}</div>
                        <div className='extra-text'>{getTimeAgo(storyData.time)}</div>
                        <div className='extra-text'> | </div>
                        <div className='extra-info'>{storyData.descendants} comments</div>
                    </div>
                </div>
            </div>
        </div>
    )
}