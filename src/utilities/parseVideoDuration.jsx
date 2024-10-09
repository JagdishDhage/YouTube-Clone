export const parseVideoDuration = (duration) => {
   
    const durationParts = duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");

    
    let formattedDuration = "";

    if (durationParts.length === 3) {
       
        formattedDuration = `${durationParts[0]}:${durationParts[1].padStart(2, '0')}:${durationParts[2].padStart(2, '0')}`;
    } else if (durationParts.length === 2) {
        
        formattedDuration = `${durationParts[0]}:${durationParts[1].padStart(2, '0')}`;
    } else if (durationParts.length === 1) {
        
        formattedDuration = `0:${durationParts[0].padStart(2, '0')}`;
    }

    return formattedDuration; 
}
