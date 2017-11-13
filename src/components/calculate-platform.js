import React from 'react';
export const Platform = (props) => {
    const train = props.train;
    let arival = train.arrivalTime;
    let dept = train.departureTime;
    let minPlatform = 1;
    for (let i = 0; i < arival.length; i++) {
        let isPlatformReq = false;
        for (let j = 0; j < i; j++) {
            if (parseFloat(dept[j]) >= parseFloat(arival[i])) {
                isPlatformReq = true;
            } else {
                dept[j] = parseFloat(dept[i]);
                isPlatformReq = false;
                break;
            }
        }
        if (isPlatformReq) {
            minPlatform++;
        }
    }
    return <div > Minimum number of Platforms Required { minPlatform } < /div>
};